// ProductActions.jsx
import React from "react";

const ProductActions = ({ onSave, onCancel }) => (
  <td>
    <button onClick={onSave}>Update Product</button>
    <button onClick={onCancel}>Cancel</button>
  </td>
);

export default ProductActions;
