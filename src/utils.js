// utils.js
export const addProduct = (newProduct, prevProducts) => {
  newProduct.id = Date.now();
  return [...prevProducts, newProduct];
};

export const removeProduct = (productId, prevProducts) =>
  prevProducts.filter(product => product.id !== productId);

export const editProduct = (updatedProduct, prevProducts) =>
  prevProducts.map(product => product.id === updatedProduct.id ? updatedProduct : product);


// utils.js
export const handleInputChange = (event, newProduct, setNewProduct) => {
  setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
};

export const handleAddProduct = (event, newProduct, addProduct, setNewProduct) => {
  event.preventDefault();
  const fields = ["name", "description", "link"];
  for (let field of fields) {
    if (!newProduct[field]) {
      alert(
        `${field.charAt(0).toUpperCase() + field.slice(1)} field is required!`
      );
      return;
    }
  }
  addProduct(newProduct);
  setNewProduct({ name: "", description: "", link: "" });
};




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