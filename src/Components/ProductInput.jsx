// ProductInput.jsx
import React from "react";

const ProductInput = ({ name, value, onChange }) => (
  <td>
    <input type="text" name={name} value={value} onChange={onChange} />
  </td>
);

export default ProductInput;
