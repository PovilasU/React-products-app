export const getProductsAsync = async () => {
    return new Promise((resolve, reject) => {
      try {
        const storedProducts = localStorage.getItem("products");
        if (storedProducts) {
          const parsedProducts = JSON.parse(storedProducts);
          resolve(parsedProducts);
        }
        resolve([]);
      } catch (error) {
        reject(error);
      }
    });
  };
  
  export const saveEdit = (id, products, editingProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? editingProduct : product
    );
    return updatedProducts;
  };
  
  export const cancelEdit = () => {
    return null;
  };