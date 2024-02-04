// ProductList.jsx

import React from "react";

function ProductList({ products, onEdit, onDelete }) {
  return (
    <div>
      {products.map((product, index) => (
        <div key={index}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <button onClick={() => onEdit(product)}>Edit</button>
          <button onClick={() => onDelete(product.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
