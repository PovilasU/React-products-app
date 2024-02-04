// Row.jsx
import React from "react";

const Row = ({ product }) => {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.link}</td>
    </tr>
  );
};

export default Row;
