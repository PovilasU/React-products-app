import "./App.css";

import React, { useState, useEffect } from "react";
import ProductInput from "./Components/ProductInput";
import ProductActions from "./Components/ProductActions";
import ProductRow from "./Components/ProductRow";
// App.jsx

import { getProductsAsync, saveEdit, cancelEdit } from "./utils";
function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    link: "",
  });

  const handleInputChangeAdd = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleInputChange = (e) => {
    setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
  };

  const addProductAsync = async (product) => {
    // Check if any of the input fields are empty
    if (!product.name || !product.description || !product.link) {
      alert("All fields must be filled out");
      return;
    }
    return new Promise((resolve, reject) => {
      try {
        const updatedProducts = [...products, product];
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
        resolve(updatedProducts);
      } catch (error) {
        reject(error);
      }
      // Clear the inputs
      setNewProductName("");
      setNewProductDescription("");
      setNewProductLink("");
    });
  };

  const deleteProduct = (id) => {
    // Remove the product from the state
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);

    // Remove the product from local storage
    localStorage.setItem("products", JSON.stringify(newProducts));
  };

  useEffect(() => {
    const getProductsAsync = async () => {
      return new Promise((resolve, reject) => {
        try {
          const storedProducts = localStorage.getItem("products");
          if (storedProducts) {
            const parsedProducts = JSON.parse(storedProducts);
            setProducts(parsedProducts);
            resolve(parsedProducts);
          }
        } catch (error) {
          reject(error);
        }
      });
    };

    getProductsAsync();
  }, []);

  const saveEdit = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? editingProduct : product
    );

    setProducts(updatedProducts);
    setEditingProduct(null);
  };

  const cancelEdit = () => {
    // Reset the editingProduct state
    setEditingProduct(null);
  };

  return (
    <div className="container">
      {/* Add your form for adding a product here */}
      {/* Map over your products and create a table row for each one */}
      <table className="table-bordered table-centered">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr id="firstRow">
            <td>
              <input
                type="text"
                name="name"
                placeholder="Enter product name"
                value={newProduct.name}
                onChange={handleInputChangeAdd}
              />
            </td>
            <td>
              <input
                type="text"
                name="description"
                placeholder="Enter product description"
                value={newProduct.description}
                onChange={handleInputChangeAdd}
              />
            </td>
            <td>
              <input
                type="text"
                name="link"
                placeholder="Enter product link"
                value={newProduct.link}
                onChange={handleInputChangeAdd}
              />
            </td>
            <td>
              <button
                onClick={() => {
                  addProductAsync({
                    id: Date.now(),
                    name: newProduct.name,
                    description: newProduct.description,
                    link: newProduct.link,
                  });
                  setNewProduct({ name: "", description: "", link: "" });
                }}
              >
                Add Product
              </button>
            </td>
          </tr>
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              editingProduct={editingProduct}
              handleInputChange={handleInputChange}
              saveEdit={saveEdit}
              cancelEdit={cancelEdit}
              setEditingProduct={setEditingProduct}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
