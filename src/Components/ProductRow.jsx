// ProductRow.jsx
import React from "react";
import ProductInput from "./ProductInput";
import ProductActions from "./ProductActions";

const ProductRow = ({
  product,
  editingProduct,
  handleInputChange,
  saveEdit,
  cancelEdit,
  setEditingProduct,
}) => (
  <tr key={product.id}>
    {editingProduct && editingProduct.id === product.id ? (
      <>
        <ProductInput
          name="name"
          value={editingProduct.name}
          onChange={handleInputChange}
        />
        <ProductInput
          name="description"
          value={editingProduct.description}
          onChange={handleInputChange}
        />
        <ProductInput
          name="link"
          value={editingProduct.link}
          onChange={handleInputChange}
        />
        <ProductActions
          onSave={() => saveEdit(product.id)}
          onCancel={() => cancelEdit()}
        />
      </>
    ) : (
      <>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>
          <a href={product.link}>Link</a>
        </td>
        <td>
          <button onClick={() => setEditingProduct(product)}>Edit</button>
          <button onClick={() => deleteProduct(product.id)}>Delete</button>
        </td>
      </>
    )}
  </tr>
);

export default ProductRow;
