// utils.js
export const addProduct = (newProduct, prevProducts) => {
  newProduct.id = Date.now();
  return [...prevProducts, newProduct];
};

export const removeProduct = (productId, prevProducts) =>
  prevProducts.filter(product => product.id !== productId);

export const editProduct = (updatedProduct, prevProducts) =>
  prevProducts.map(product => product.id === updatedProduct.id ? updatedProduct : product);


  export const fetchProducts = async () => {
    try {
      const response = await fetch('https://api.example.com/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const products = await response.json();
      return products;
    } catch (error) {
      console.error('Fetching products failed: ', error);
      return [];
    }
  };


export const fetchProductsWithPromises = () => {
  return fetch('https://api.example.com/products')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Fetching products failed: ', error);
      return [];
    });
};