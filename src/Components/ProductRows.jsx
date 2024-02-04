import React from "react";
import ProductRow from "./ProductRow";

const ProductRows = ({ products, removeProduct, editProduct }) => (
  <>
    {products.map((product, index) => (
      <ProductRow
        key={index}
        product={product}
        removeProduct={removeProduct}
        editProduct={editProduct}
      />
    ))}
  </>
);

export default ProductRows;
