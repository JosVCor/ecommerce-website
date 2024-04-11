// ProductCard.js
import React from 'react';
import './productCard.css';
import {Link} from 'react-router-dom';

const ProductCard = ({product}) => {
    return (
        <div className='product-card' key={product._id}>
            <Link to={`/product/${product._id}`}>
                <img className='product-img' src={`http://localhost:3000/uploads/${product.image}`} alt={product.name}/>
            </Link>
            <h2 className="product-name">{product.name}</h2>
            {/*<p>{product.description}</p>*/}
            <p>${product.price}</p>
            <p># in stock {product.countInStock}</p>
        </div>
    );
};

export default ProductCard;
