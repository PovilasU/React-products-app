// AddProductRow.jsx
import React, { useState } from "react";

const AddProductRow = ({ addProduct }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    link: "",
  });

  const handleInputChange = (event) => {
    setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    addProduct(newProduct);
    setNewProduct({ name: "", description: "", link: "" });
  };

  return (
    <tr>
      <td>
        <input
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
      </td>
      <td>
        <input
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
      </td>
      <td>
        <input
          name="link"
          value={newProduct.link}
          onChange={handleInputChange}
          placeholder="Link"
          required
        />
      </td>
      <td>
        <button onClick={handleAddProduct}>Add</button>
      </td>
    </tr>
  );
};

export default AddProductRow;
