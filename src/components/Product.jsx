import React from "react";
import Switch from "react-switch";
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useThemeContext} from "../hooks/useThemeContext";

export const Product = ({product, onChangeStatus, onEdit, onDelete}) => {
  const { darkMode } = useThemeContext();

  return (
    <>
      <td className="text-center">
        <Switch
          onChange={(checked) => onChangeStatus(product.id, checked)}
          checked={product.status}
          height={10}
          width={20}
          handleDiameter={10}
          uncheckedIcon={false}
          checkedIcon={false}
          className="react-switch"
          onColor={darkMode ? '#20c997' : '#0d6efd'}
          boxShadow="0 1px 2px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0 0 1px 5px rgba(0, 0, 0, 0.2)"
        />
      </td>
      <td>
        {product.product}
      </td>
      <td>
        {product.id}
      </td>
      <td>
        {product.netType &&
          <img src={`img/${product.netType}.svg`} alt={product.netType} className="me-2"/>
        }
        <span>{product.title}</span>
      </td>
      <td className="text-center">
        <OverlayTrigger placement="bottom" overlay={<Tooltip>Remove product</Tooltip>}>
          <Button variant="outline-danger" className="btn-sm" onClick={() => onDelete(product.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit product</Tooltip>}>
          <Button variant="outline-primary" className="btn-sm ms-1" onClick={() => onEdit(product)}>
            <FontAwesomeIcon icon={faPencil} />
          </Button>
        </OverlayTrigger>
      </td>
    </>
  );
}
