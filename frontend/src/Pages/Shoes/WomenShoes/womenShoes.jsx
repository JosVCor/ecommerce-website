import React, {useEffect, useState} from 'react';
import ProductCard from "../../../Components/ProductCard/productCard";

const WomenShoes = () => {
    const [womenShoesProducts, setWomenShoesProducts] = useState([]);

    useEffect(() => {
        const fetchMensProducts = async () => {
            try{
                const response = await fetch('http://localhost:3000/api/products/category/65dd36bb16f94a47e4c10f11');
                setWomenShoesProducts(await response.json());
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchMensProducts().then(r => console.log('Women Shoes:', r)  );
    }, []);

    return (
        <div>
            <h1>
                Women Shoes
            </h1>
            <div>
                {womenShoesProducts.length > 0 ?(
                    womenShoesProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))) :( <p>No products available</p>)}
            </div>
        </div>
    );
};
export default WomenShoes;