// ProductRow.jsx
import React, { useState, useEffect } from "react";

const ProductRow = ({ product, removeProduct, editProduct }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editProduct(editedProduct);
    setIsEditing(false);
  };

  return (
    <tr>
      {isEditing ? (
        <>
          <td>
            <input
              value={editedProduct.name}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, name: e.target.value })
              }
            />
          </td>
          <td>
            <input
              value={editedProduct.description}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  description: e.target.value,
                })
              }
            />
          </td>
          <td>
            <input
              value={editedProduct.link}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, link: e.target.value })
              }
            />
          </td>
          <td>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </td>
        </>
      ) : (
        <>
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td>{product.link}</td>
          <td>
            <button onClick={() => removeProduct(product.id)}>Remove</button>
            <button onClick={handleEdit}>Edit</button>
          </td>
        </>
      )}
    </tr>
  );
};

export default ProductRow;
