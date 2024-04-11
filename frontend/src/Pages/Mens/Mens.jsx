import React, {useState, useEffect} from 'react';
import ProductCard from "../../Components/ProductCard/productCard";
import './Mens.css';
import {Link} from "react-router-dom";
// import { getProductsByCategory } from "../../Services/apiService";

const Mens = () => {
    const [mensProducts, setMensProducts] = useState([]);

    useEffect(() => {
        const fetchMensProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products/category/65dd36a416f94a47e4c10f0d');
                setMensProducts(await response.json());
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchMensProducts().then(r => console.log('Mens Products:', r));
    }, []);

    return (
        <div className="container-men">
            <h1>
                Mens Products
            </h1>
            <div className="mens-background-image-container">
                <div className="men-background-image-1"></div>
                <div className="men-background-image-2"></div>
                <div className="men-background-image-3"></div>
            </div>

            <div className="mens-accessories-container">
                <div className='mens-accessories-content'>
                    <Link to="/mensTop" className='Men-Tops'>
                        <p className="mens-accessories-text">Tops</p>
                    </Link>
                    <Link className='Men-Shorts'>
                        <p className="mens-accessories-text">Shorts</p>
                    </Link>
                    <Link className='Men-Pants'>
                        <p className="mens-accessories-text">Pants</p>
                    </Link>
                    <Link className='Men-Shoes'>
                        <p className="mens-accessories-text">Shoes</p>
                    </Link>
                    <Link className='Men-Accessories'>
                        <p className="mens-accessories-text">Accessories</p>
                    </Link>
                    <Link className='Men-Swimsuits'>
                        <p className="mens-accessories-text">Swimsuits</p>
                    </Link>
                </div>
            </div>

            <Link className="sales-container">
                <div className="sales-content">

                </div>
            </Link>

            <div className="test">
                <div className="test2">
                    <div className="filter-col">
                        <h2 className="text-center">Men</h2>
                        <ul>
                            <label>
                                <input type="checkbox"/>
                                T-Shirts
                            </label>

                            <label>
                                <input type="checkbox"/>
                                Jeans
                            </label>
                        </ul>
                    </div>
                    <div className="filter-col1">
                        <h2 className="text-center">Filters</h2>
                        <div className="filter-col2">
                            <ul>
                                <label>
                                    <input type="checkbox"/>
                                    T-Shirts
                                </label>

                                <label>
                                    <input type="checkbox"/>
                                    Jeans
                                </label>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-container">
                    <div className="product-col">
                        {mensProducts.length > 0 ? (
                            mensProducts.map((product) => (
                                <ProductCard key={product._id} product={product}/>
                            ))) : (<p>No products available</p>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mens;