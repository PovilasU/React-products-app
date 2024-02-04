// App.jsx
import React, { useState } from "react";
import Table from "./Components/Table";
import { addProduct, removeProduct, editProduct } from "./utils";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);

  const handlers = {
    addProduct: (newProduct) =>
      setProducts((prevProducts) => addProduct(newProduct, prevProducts)),
    removeProduct: (productId) =>
      setProducts((prevProducts) => removeProduct(productId, prevProducts)),
    editProduct: (updatedProduct) =>
      setProducts((prevProducts) => editProduct(updatedProduct, prevProducts)),
  };

  return <Table products={products} {...handlers} />;
};

export default App;
