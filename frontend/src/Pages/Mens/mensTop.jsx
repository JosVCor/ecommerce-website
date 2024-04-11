import React, { useState, useEffect } from 'react';
import ProductCard from "../../Components/ProductCard/productCard";
import './mensTop.css';
import { Link } from "react-router-dom";

const MensTop = () => {
    const [mensTopProducts, setMensTopProducts] = useState([]);

    useEffect(() => {
        const fetchMensTopProducts = async () => {
            try {
                // Send a request to your backend API to fetch products with categories "men" and "tops"
                const response = await fetch('http://localhost:3000/api/products/category/65dd36a416f94a47e4c10f0d, 65f0b84368041df244d14b6f');
                setMensTopProducts(await response.json());
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchMensTopProducts().then(r => console.log('Mens Top Products:', r));
    }, []);

    return (
        <div className="container-mens-top">
            <h1>Mens Tops</h1>
            <div className="product-list">
                {mensTopProducts.length > 0 ? (
                    mensTopProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
            <Link to="/mens">Back to Mens Products</Link> {/* Link to go back to Mens page */}
        </div>
    );
};

export default MensTop;
