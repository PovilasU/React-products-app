import "./App.css";

import React, { useState, useEffect } from "react";
// App.jsx

import {} from "./utils";
function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    link: "",
  });

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

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

  const deleteProduct = (id) => {
    // Remove the product from the state
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);

    // Remove the product from local storage
    localStorage.setItem("products", JSON.stringify(newProducts));
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setEditProductName(product.name);
    setEditProductDescription(product.description);
    setEditProductLink(product.link);
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

  const handleUpdateProduct = (id) => {
    // Find the index of the product with the given id
    const index = products.findIndex((product) => product.id === id);

    // Create a new product object with the updated name, description, and link
    const updatedProduct = {
      ...products[index],
      name: editProductName,
      description: editProductDescription,
      link: editProductLink,
    };

    // Create a new array with the updated product
    const updatedProducts = [
      ...products.slice(0, index),
      updatedProduct,
      ...products.slice(index + 1),
    ];

    // Update the products state
    setProducts(updatedProducts);

    // Reset the editingProduct state
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
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="description"
                placeholder="Enter product description"
                value={newProduct.description}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="link"
                placeholder="Enter product link"
                value={newProduct.link}
                onChange={handleInputChange}
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
          {products.map((product) => {
            return (
              <tr key={product.id}>
                {editingProduct && editingProduct.id === product.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={editProductName}
                        onChange={(e) => setEditProductName(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editProductDescription}
                        onChange={(e) =>
                          setEditProductDescription(e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editProductLink}
                        onChange={(e) => setEditProductLink(e.target.value)}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleUpdateProduct(product.id)}>
                        Update Product
                      </button>
                      <button onClick={() => cancelEdit()}>Cancel</button>
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
                      <button onClick={() => handleEditProduct(product)}>
                        Edit
                      </button>
                      <button onClick={() => deleteProduct(product.id)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
