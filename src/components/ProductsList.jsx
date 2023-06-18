import React, {memo} from "react";
import {Product} from "./Product";
import {Table} from "react-bootstrap";
import {useThemeContext} from "../hooks/useThemeContext";

const ProductsList = ({products, selectedProducts, onChangeSelected, onChangeStatus, onEdit, onDelete}) => {
  const { darkMode } = useThemeContext();
  const theme = darkMode ? 'dark' : 'light';

  return (
    <Table striped bordered hover variant={theme}>
      <thead>
      <tr>
        <th width={70}>Status</th>
        <th>Product</th>
        <th>ID</th>
        <th>Name</th>
        <th width={85} className="text-center">Actions</th>
      </tr>
      </thead>
      <tbody>
      {products.map(product => (
        <tr key={product.id} className={selectedProducts.includes(product.id) ? 'table-active' : ''} onClick={() => onChangeSelected(product.id)}>
          <Product product={product} onChangeStatus={onChangeStatus} onEdit={onEdit} onDelete={onDelete}/>
        </tr>
      ))}
      </tbody>
    </Table>
  );
};

export default memo(ProductsList);
