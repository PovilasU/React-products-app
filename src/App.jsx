import "./App.css";

import React, { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProductName, setNewProductName] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductLink, setNewProductLink] = useState("");

  const [editProductName, setEditProductName] = useState("");
  const [editProductDescription, setEditProductDescription] = useState("");
  const [editProductLink, setEditProductLink] = useState("");

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

  const editProduct = (product) => {
    setEditingProduct(product);
    setEditProductName(product.name);
    setEditProductDescription(product.description);
    setEditProductLink(product.link);
  };

  const deleteProduct = (id) => {
    // Remove the product from the state
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);

    // Remove the product from local storage
    localStorage.setItem("products", JSON.stringify(newProducts));
  };

  const updateProduct = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const handleSubmit = () => {
    if (editingProduct) {
      updateProduct({
        id: editingProduct.id,
        name: newProductName,
        description: newProductDescription,
        link: newProductLink,
      });
    } else {
      addProductAsync({
        id: Date.now(),
        name: newProductName,
        description: newProductDescription,
        link: newProductLink,
      });
    }
    setEditingProduct(null);
    setNewProductName("");
    setNewProductDescription("");
    setNewProductLink("");
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
                placeholder="Enter product name"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter product description"
                value={newProductDescription}
                onChange={(e) => setNewProductDescription(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Enter product link"
                value={newProductLink}
                onChange={(e) => setNewProductLink(e.target.value)}
              />
            </td>
            <td>
              <button
                onClick={() =>
                  addProductAsync({
                    id: Date.now(),
                    name: newProductName,
                    description: newProductDescription,
                    link: newProductLink,
                  })
                }
              >
                Add Product
              </button>
            </td>
          </tr>
          {products.map((product, index) => (
            <tr key={index}>
              {editingProduct?.id === product.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={newProductName}
                      onChange={(e) => setNewProductName(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={newProductDescription}
                      onChange={(e) => setNewProductDescription(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={newProductLink}
                      onChange={(e) => setNewProductLink(e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={handleSubmit}>Update Product</button>
                    <button onClick={() => setEditingProduct(null)}>
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>
                    <a href={product.link}>Link</a>
                  </td>
                  <td>
                    <button onClick={() => editProduct(product)}>Edit</button>
                    <button onClick={() => deleteProduct(product.id)}>
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
