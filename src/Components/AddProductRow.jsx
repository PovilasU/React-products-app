// AddProductRow.jsx
import React, { useState } from "react";
import { handleInputChange, handleAddProduct } from "../utils";

const AddProductRow = ({ addProduct }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    link: "",
  });

  return (
    <tr>
      {["name", "description", "link"].map((field) => (
        <td key={field}>
          <input
            name={field}
            value={newProduct[field]}
            onChange={(event) =>
              handleInputChange(event, newProduct, setNewProduct)
            }
          />
        </td>
      ))}
      <td>
        <button
          onClick={(event) =>
            handleAddProduct(event, newProduct, addProduct, setNewProduct)
          }
        >
          Add
        </button>
      </td>
    </tr>
  );
};

export default AddProductRow;
