// utils.js

export const addProductAsync = async (product, products, setProducts) => {
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
    });
  };
  
  export const editProduct = (product, setEditingProduct, setEditProductName, setEditProductDescription, setEditProductLink) => {
    setEditingProduct(product);
    setEditProductName(product.name);
    setEditProductDescription(product.description);
    setEditProductLink(product.link);
  };
  
  export const deleteProduct = (id, products, setProducts) => {
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
  };
  
  export const updateProduct = (updatedProduct, products, setProducts) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };
  
  export const getProductsAsync = async (setProducts) => {
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