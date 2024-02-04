import React from "react";

const ActionButtons = ({ isEditing, onSave, onCancel, onEdit, onRemove }) => (
  <td>
    {isEditing ? (
      <>
        <button onClick={onSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </>
    ) : (
      <>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onRemove}>Remove</button>
      </>
    )}
  </td>
);

export default ActionButtons;
