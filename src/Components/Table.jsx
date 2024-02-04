// Table.jsx
import React from "react";
import AddProductRow from "./AddProductRow";
import ProductRow from "./ProductRow";

const Table = ({ products, addProduct, removeProduct, editProduct }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        <AddProductRow addProduct={addProduct} />
        {products.map((product, index) => (
          <ProductRow
            key={index}
            product={product}
            removeProduct={removeProduct}
            editProduct={editProduct}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
