import React, { useState, useEffect } from "react";
import EditableField from "./EditableField";
import ActionButtons from "./ActionButtons";

const ProductRow = ({ product, removeProduct, editProduct }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleInputChange = (field, value) => {
    setEditedProduct({ ...editedProduct, [field]: value });
  };

  const handleSave = () => {
    editProduct(editedProduct);
    setIsEditing(false);
  };

  const fields = ["name", "description", "link"];

  return (
    <tr>
      {fields.map((field) => (
        <EditableField
          key={field}
          isEditing={isEditing}
          field={field}
          value={isEditing ? editedProduct[field] : product[field]}
          onChange={handleInputChange}
        />
      ))}
      <ActionButtons
        isEditing={isEditing}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
        onEdit={() => setIsEditing(true)}
        onRemove={() => removeProduct(product.id)}
      />
    </tr>
  );
};

export default ProductRow;
