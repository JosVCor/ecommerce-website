const cartService = {
    addToCart: async (productId, quantity) => {
        const response = await fetch('http://localhost:3000/api/cart/add-to-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({productId, quantity})
        });
        const data = await response.json();
        return data;
    },

    updateQuantity: async (productId, newQuantity) => {
        const response = await fetch('http://localhost:3000/api/cart/update-quantity', {
            method: 'PUT',  // Assuming you use PUT for updating quantity on the server
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId, newQuantity })
        });
        const data = await response.json();
        return data;
    }
};



export default cartService;