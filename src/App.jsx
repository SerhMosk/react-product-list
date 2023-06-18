import React, {Component} from "react";
import "./assets/scss/bootstrap.scss";
import './App.scss';
import {Button, Col, Container, OverlayTrigger, Row, Tooltip} from "react-bootstrap";

import {get, patch, post, remove, removeForFew} from "./api/request-service";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import ProductsList from "./components/ProductsList";
import {AppToast} from "./components/AppToast";
import {ProductModal} from "./components/modals/ProductModal";
import {Header} from "./components/Header";
import SweetAlert from "react-bootstrap-sweetalert";

const defaultModal = {show: false, title: '', data: {}};
const defaultToast = {show: false, title: '', content: ''};

class App extends Component {
  state = {
    modal: defaultModal,
    toast: defaultToast,
    showAlert: false,
    products: [],
    selectedProducts: [],
  };

  getProducts = () => {
    get('products').then((res) => {
      this.setState((state) => {
        return { ...state, products: res || [] };
      });
    });
  };

  changeStatus = (id, status) => {
    patch('products/' + id, {status}).then(res => {
      this.setState((state) => {
        return {
          ...state,
          toast: {show: true, title: 'Success', content: 'Product has been changed'},
          products: state.products.map(item => {
            if (item.id === id) {
              return { ...item, status };
            }
            return item;
          }),
        };
      });
    });
  };

  addProduct = (body) => {
    post('products', body).then(res => {
      this.setState((state) => {
        return {
          ...state,
          modal: defaultModal,
          toast: { show: true, title: 'Success', content: 'Product has been added' },
          products: [ ...state.products, res ],
        };
      });
    });
  };

  updateProduct = (id, body) => {
    patch('products/' + id, body).then(res => {
      this.setState((state) => {
        return {
          ...state,
          modal: defaultModal,
          toast: {show: true, title: 'Success', content: 'Product has been updated'},
          products: state.products.map(item => {
            if (item.id === id) {
              return { ...item, ...res };
            }
            return item;
          }),
        };
      });
    });
  };

  onDelete = (id) => {
    remove('products/' + id).then(res => {
      this.setState((state) => {
        return {
          ...state,
          toast: {show: true, title: 'Success', content: 'Product has been deleted'},
          products: state.products.filter(item => item.id !== id),
        };
      });
    });
  };

  submitModal = (data) => {
    console.log('submit:', data);
    if (data.id) {
      this.updateProduct(data.id, data);
    } else {
      this.addProduct(data);
    }
  };

  changeSelected = (id) => {
    this.setState((state) => {
      if (this.state.selectedProducts.includes(id)) {
        return { ...state, selectedProducts: state.selectedProducts.filter(item => item !== id) };
      }
      return { ...state, selectedProducts: [ ...state.selectedProducts, id ] };
    });
  };

  removeSelected = () => {
    this.setState({ showAlert: true });
  };

  onCancelRemove = () => {
    this.setState({ showAlert: false });
  };

  onConfirmRemove = async () => {
    this.setState({ showAlert: false });
    let products = this.state.products;
    const results = [];

    await Promise.all(this.state.selectedProducts.map(async (id) => {
      const result = await removeForFew('products/' + id);
      if (result.ok) {
        products = products.filter(item => item.id !== id);
        results.push(id);
      }
    }));

    console.log('remove result:', results);
    if (results.length) {
      this.setState((state) => {
        return {
          ...state,
          toast: {show: true, title: 'Success', content: 'Products has been deleted'},
          products
        };
      });
    }
  };

  openProductModal = (data = null) => {
    console.log('modal data:', data);
    this.setState((state) => {
      return {
        ...state,
        modal: {show: true, title: data.id ? 'Edit product' : 'Add product', data},
      };
    });
  };

  closeModal = () => {
    this.setState((state) => {
      return {
        ...state,
        modal: defaultModal,
      };
    });
  };

  closeToast = () => {
    this.setState((state) => {
      return {
        ...state,
        toast: defaultToast,
      };
    });
  };

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const { products, selectedProducts, showAlert, modal, toast } = this.state;

    return (
      <>
        <Header />
        <div className="App pt-2">
          <Container>
            <Row>
              <Col className={'col-11'}>
                {products.length !== 0 &&
                  <ProductsList
                    products={products}
                    selectedProducts={selectedProducts}
                    onChangeSelected={this.changeSelected}
                    onChangeStatus={this.changeStatus}
                    onEdit={this.openProductModal}
                    onDelete={this.onDelete}
                  />
                }
                {products.length === 0 &&
                  <p>No products yet</p>
                }
              </Col>
              <Col className={'col-1 pt-1'}>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Add product</Tooltip>}>
                  <Button variant="outline-primary" className="btn-sm" onClick={() => this.openProductModal({})}>
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </OverlayTrigger>
                <br/>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Remove selected</Tooltip>}>
                  <Button variant="outline-danger" className="btn-sm mt-2" onClick={this.removeSelected} disabled={selectedProducts.length === 0}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </OverlayTrigger>
              </Col>
            </Row>
          </Container>

          {toast.show &&
            <AppToast show={toast.show } title={toast.title} closeToast={this.closeToast}>
              {toast.content}
            </AppToast>
          }

          {modal.show &&
            <ProductModal show={modal.show} title={modal.title} data={modal.data} closeModal={this.closeModal} submitModal={this.submitModal}/>
          }

          {showAlert &&
            <SweetAlert
              warning
              showCancel
              confirmBtnText="Yes, delete it!"
              cancelBtnBsStyle="secondary"
              confirmBtnBsStyle="danger"
              title="Are you sure?"
              onConfirm={this.onConfirmRemove}
              onCancel={this.onCancelRemove}
              focusCancelBtn
            >
              You will not be able to recover this products!
            </SweetAlert>
          }
        </div>
      </>
    );
  }
}

export default App;
