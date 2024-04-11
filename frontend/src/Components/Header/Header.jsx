import React, {useState, useEffect} from 'react';
import './Header.css';
import {Link} from "react-router-dom";
import CategoryService from "../../Services/CategoryService";

const Header = () => {
    const [dropdownVisible, setDropdownVisible] = useState({
        women: false,
        men : false,
        shoes: false,
        accessories: false,
        swimsuits: false
    });

    const handleCategoryHover = (category) => {
        setDropdownVisible((prevStates) => ({ ...prevStates, [category]: true }));
    };

    const handleCategoryLeave = (category) => {
        setDropdownVisible((prevStates) => ({ ...prevStates, [category]: false }));
    };

    return (
        <div>
            <div className='logo'>
                <Link className='logo-text' to='/'>Until Death Do Us Shop</Link>
            </div>

            <div className='main-header'>

                <div className='category-container'
                     onMouseEnter={() => handleCategoryHover('women')}
                     onMouseLeave={() => handleCategoryLeave('women')}>
                    <Link className='category-w' to="/Women">
                        <h3>Women</h3>
                    </Link>
                    {dropdownVisible['women'] && (
                        <div className='subcategories-w'>
                            <Link className='subcat-w-s' to="/women Shoes">Women Shoes</Link>
                            <Link className='subcat-w-s' to="/womenAccessories">Women Accessories</Link>
                            <Link className='subcat-w-s' to="/womenSwimsuits">Women Swimsuits</Link>
                        </div>)}
                </div>

                <div className='category-container'
                     onMouseEnter={() => handleCategoryHover('men')}
                     onMouseLeave={() => handleCategoryLeave('men')}>
                    <Link className='category-w' to="/mens">
                        <h3>Men</h3>
                    </Link>
                    {dropdownVisible['men'] && (
                        <div className='subcategories-w'>
                            <Link className='subcat-w-s' to="/menShoes">Men Shoes</Link>
                            <Link className='subcat-w-s' to="/womenAccessories">Men Accessories</Link>
                            <Link className='subcat-w-s' to="/menSwimsuits">Men Swimsuits</Link>
                        </div>)}
                </div>

                <div className='category-container'
                     onMouseEnter={() => handleCategoryHover('shoes')}
                     onMouseLeave={() => handleCategoryLeave('shoes')}>
                    <Link className='category-w' to="/Shoes">
                        <h3>Shoes</h3>
                    </Link>
                    {dropdownVisible['shoes'] && (
                        <div className='subcategories-w'>
                            <Link className='subcat-w-s' to="/women Shoes">Women Shoes</Link>
                            <Link className='subcat-w-s' to="/men Shoes">Men Shoes</Link>
                        </div>)}
                </div>

                <div className='category-container'
                     onMouseEnter={() => handleCategoryHover('accessories')}
                     onMouseLeave={() => handleCategoryLeave('accessories')}>
                    <Link className='category-w' to="/Accessories">
                        <h3>Accessories</h3>
                    </Link>
                    {dropdownVisible['accessories'] && (
                        <div className='subcategories-w'>
                            <Link className='subcat-w-s' to="/women Shoes">Jewelery</Link>
                            <Link className='subcat-w-s' to="/womenAccessories">Hats</Link>
                            <Link className='subcat-w-s' to="/womenSwimsuits">Glasses</Link>
                            <Link className='subcat-w-s' to="/womenSwimsuits">Belts</Link>
                            <Link className='subcat-w-s' to="/womenSwimsuits">Bags</Link>
                            <Link className='subcat-w-s' to="/womenSwimsuits">Wallets</Link>
                            <Link className='subcat-w-s' to="/womenSwimsuits">Scents</Link>
                        </div>)}
                </div>

                <div className='category-container'
                     onMouseEnter={() => handleCategoryHover('swimsuits')}
                     onMouseLeave={() => handleCategoryLeave('swimsuits')}>
                    <Link className='category-w' to="/Women">
                        <h3>Swimsuits</h3>
                    </Link>
                    {dropdownVisible['swimsuits'] && (
                        <div className='subcategories-w'>
                            <Link className='subcat-w-s' to="/women Shoes">Women Swimsuits</Link>
                            <Link className='subcat-w-s' to="/womenAccessories">Men Swimsuits</Link>
                        </div>)}
                </div>

            </div>
        </div>
    );
};

export default Header;