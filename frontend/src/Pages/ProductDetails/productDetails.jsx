import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './productDetails.css';
import cartService from "../../Services/CartService";

const ProductDetails = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products/${id}`);
                const data = await response.json();
                console.log('Data from API:', data);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct().then(r => console.log('Product:', r));

    }, [id]);

    const addToCart = async () => {
        // Add product to cart
        try{
            await cartService.addToCart(product._id, 1);
            console.log('Product added to cart');
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    return (
        <div className="container">
            <div className="product-container">
                {Object.keys(product).length > 0 ? (
                    <div className="col-2" key={product._id}>
                        <img className='product-detail-img' src={`http://localhost:3000/uploads/${product.image}`}
                             alt={product.name}/>
                    </div>

                ) : (
                    <p>Loading...</p>
                )}
                <div className="col-4">
                    <h1>{product.name}</h1>
                    <div className="product-info">
                        <div className='product-price'>
                            <p>Price: ${product.price}</p>
                        </div>
                        <div className='product-stock'>
                            <p>Product in stock: {product.countInStock}</p>
                        </div>
                        <div>
                            <p>Color</p>
                        </div>
                        <div>
                            <p>Size: </p>
                        </div>
                        <div className='product-description'>
                            <p>{product.description}</p>
                        </div>
                    </div>
                    <button onClick={addToCart} >Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
