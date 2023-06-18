import {Button, Modal, Form} from "react-bootstrap";
import {useState} from "react";
import {useThemeContext} from "../../hooks/useThemeContext";

export const ProductModal = ({show, title, data, closeModal, submitModal}) => {
  const {darkMode} = useThemeContext();
  const theme = darkMode ? 'dark' : 'light';
  const [state, setState] = useState(() => {
    return data || {
      title: '',
      netType: '',
      product: '',
      status: false
    };
  });
  const changeInput = (event) => {
    setState({
      [event.target.name]: event.target.value
    });
  };

  return (
    <Modal show={show} onHide={closeModal} dialogClassName={theme}>
      <Form onSubmit={() => submitModal(state)}>
      <Modal.Header closeButton closeVariant={darkMode ? 'white' : 'dark'}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            required
            name="title"
            value={state.title}
            onChange={changeInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Product</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product"
            required
            name="product"
            value={state.product}
            onChange={changeInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="netType">
          <Form.Label>Net type</Form.Label>
          <Form.Select
            aria-label="Net type"
            placeholder="Enter net type"
            name="netType"
            value={state.netType}
            onChange={changeInput}
          >
            <option value="">Select net type</option>
            <option value="KS">KS</option>
            <option value="Life">Life</option>
            <option value="Amazon">Amazon</option>
            <option value="Fotos">Fotos</option>
            <option value="China">China</option>
            <option value="Joom">Joom</option>
            <option value="Rozetka">Rozetka</option>
            <option value="Delivery">Delivery</option>
            <option value="Shop Logistics">Shop Logistics</option>
            <option value="UPS">UPS</option>
            <option value="Prom">Prom</option>
            <option value="Red">Red</option>
            <option value="Autolux">Autolux</option>
            <option value="Meest Express">Meest Express</option>
            <option value="Ebay">Ebay</option>
            <option value="Modna Kasta">Modna Kasta</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Status"
            name="status"
            value={state.status}
            onChange={changeInput}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>
  );
};
