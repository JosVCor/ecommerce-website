import React, { useState, useEffect } from 'react';
import './Cart.css';
import cartService from '../../Services/CartService'; // Update this path

const CartPage = () => {
    const [cart, setCart] = useState(null);

    const fetchCartData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/cart/get-cart');
            const cartData = await response.json();

            const total = cartData.items.reduce((acc, item) => {
                return acc + (item.productId.price * item.quantity);
            }, 0);

            cartData.total = total;

            setCart(cartData);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    const handleQuantityChange = async (productId, newQuantity) => {
        try {
            await cartService.updateQuantity(productId, newQuantity);
            // Refresh the cart data after updating the quantity
            fetchCartData();
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    return (
        <div className="container">
            <h2>Shopping Cart</h2>
            {cart ? (
                <div className="">
                    <h3>Cart Items</h3>
                    <ul className="cart-items">
                        {cart.items.map((item) => (
                            <li className="cart-item-list" key={item.productId._id}>
                                <img
                                    className='cart-item-img'
                                    src={`http://localhost:3000/uploads/${item.productId.image}`}
                                    alt={item.productId.name}
                                />
                                <p className='cart-item-img'>Product Name: {item.productId.name}</p>
                                <p className='cart-item-img'>Quantity:
                                    <select
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.productId._id, e.target.value)}
                                    >
                                        {[...Array(10).keys()].map((num) => (
                                            <option key={num + 1} value={num + 1}>{num + 1}</option>
                                        ))}
                                    </select>
                                </p>
                                <p className='cart-item-img'>Price: ${item.productId.price}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-checkout">
                        <h3>Total: ${cart.total}</h3>
                        <button className="checkout-button">Checkout</button>
                    </div>
                </div>
            ) : (
                <p>Loading cart...</p>
            )}
        </div>
    );
};

export default CartPage;
