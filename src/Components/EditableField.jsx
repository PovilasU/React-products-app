// Row.jsx
import React from "react";

const EditableField = ({ isEditing, field, value, onChange }) => (
  <td>
    {isEditing ? (
      <input value={value} onChange={(e) => onChange(field, e.target.value)} />
    ) : (
      value
    )}
  </td>
);

export default EditableField;
