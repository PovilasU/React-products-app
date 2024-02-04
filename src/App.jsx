// App.jsx
import React, { useState } from "react";
import Table from "./Components/Table";
import { addProduct, removeProduct, editProduct } from "./utils";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => addProduct(newProduct, prevProducts));
  };

  const handleRemoveProduct = (productId) => {
    setProducts((prevProducts) => removeProduct(productId, prevProducts));
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts((prevProducts) => editProduct(updatedProduct, prevProducts));
  };

  return (
    <div>
      <Table
        products={products}
        addProduct={handleAddProduct}
        removeProduct={handleRemoveProduct}
        editProduct={handleEditProduct}
      />
    </div>
  );
};

export default App;
