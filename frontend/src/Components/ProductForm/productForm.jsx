// ProductForm.jsx
import React, { useState, useEffect } from 'react';
import useFormValidation from "./useFormValidation";
import CategoryService from "../../Services/CategoryService";
import { createProduct } from "../../Services/apiService";
import './productForm.css';
import ColorService from "../../Services/colorService";
import SizeService from "../../Services/sizeService";

const ProductForm = () => {
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await CategoryService.getCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        };

        const fetchColorsAndSizes = async () => {
            try {
                const colorsData = await ColorService.getColors();
                const sizesData = await SizeService.getSizes();
                setColors(colorsData);
                setSizes(sizesData);
            } catch (error) {
                console.error('Error fetching colors and sizes', error);
            }
        };

        fetchCategories().then(r => console.log('Fetched Categories:', r));
        fetchColorsAndSizes().then(r => console.log('Fetched Colors and Sizes:', r));
    }, []);

    const { formData, formErrors, handleChange, handleSubmit } = useFormValidation(
        {
            name: '',
            image: null,
            price: 0,
            color: [],
            size: [],
            category: [],
            countInStock: 0,
            description: '',
        },
        {
            name: [
                [(value) => value.trim().length === 0, 'Name is required'],
                [(value) => value.length < 3, 'Name must be at least 3 characters long'],
            ],
            image: [[(value) => !value, 'Image is required']],
            price: [[(value) => value <= 0, 'Price must be greater than 0']],
            category: [[(value) => !value, 'Category is required']],

        }
    );

    const handleCategoryChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setSelectedCategories(selectedOptions);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            // Map selected colors and sizes to their corresponding ObjectIds
            const colorIds = selectedColors.map(colorName => colors.find(color => color.name === colorName)._id);
            const sizeIds = selectedSizes.map(sizeName => sizes.find(size => size.name === sizeName)._id);

            const createdProduct = await createProduct({
                ...formData,
                color: colorIds,
                size: sizeIds,
                category: selectedCategories,
            });
            console.log('Product created:', createdProduct);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div>
            <h2 className='form-title'>Create Product</h2>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className='product-form'>
                    <div className='product-form1'>
                        <label className='product-name'>
                            <p>
                                Product Name:
                            </p>
                            <input
                                className='input-field'
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </label>
                        <span className='form-error'>{formErrors.name}</span>
                        <label className='product-name'>
                            <p>
                                Image:
                            </p>
                            <input
                                type="file"
                                name="image"
                                onChange={handleChange}
                            />
                        </label>
                        <span className='form-error'>{formErrors.image}</span>
                        <label className='product-name'>
                            <p>
                                Price:
                            </p>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </label>
                        <span className='form-error'>{formErrors.price}</span>
                        <label className='product-color'>
                            <p>Color:</p>
                            <select
                                name="color"
                                value={selectedColors}
                                onChange={(e) => setSelectedColors(Array.from(e.target.selectedOptions).map(option => option.value))}
                                multiple
                            >
                                {colors.map(color => (
                                    <option key={color._id} value={color.name} style={{backgroundColor: color.hexCode}}>
                                        {color.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        {selectedColors.length > 0 && (
                            <div>
                                <p>Selected Colors:</p>
                                <ul>
                                    {selectedColors.map((color) => (
                                        <li key={color}>{color}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <label className='product-size'>
                            <p>Size:</p>
                            <select
                                name="size"
                                value={selectedSizes}
                                onChange={(e) => setSelectedSizes(Array.from(e.target.selectedOptions).map(option => option.value))}
                                multiple
                            >
                                {sizes.map(size => (
                                    <option key={size._id} value={size.name}>
                                        {size.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        {selectedSizes.length > 0 && (
                            <div>
                                <p>Selected Sizes:</p>
                                <ul>
                                    {selectedSizes.map((size) => (
                                        <li key={size}>{size}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className='product-form2'>
                        <label className='product-name'>
                            <p>
                                Category:
                            </p>
                            <select
                                name="category"
                                value={selectedCategories}
                                onChange={handleCategoryChange}
                                multiple>
                                {categories.map(category => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <span className='form-error'>{formErrors.category}</span>
                        {selectedCategories.length > 0 && (
                            <div>
                                <p>Selected Categories:</p>
                                <ul>
                                    {selectedCategories.map((categoryId) => (
                                        <li key={categoryId}>{categories.find((cat) => cat._id === categoryId).name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <label className='product-name'>
                            <p>
                                Count in Stock:
                            </p>
                            <input
                                type="number"
                                name="countInStock"
                                value={formData.countInStock}
                                onChange={handleChange}
                            />
                        </label>
                        <span className='form-error'>{formErrors.countInStock}</span>
                        <label className='product-name'>
                            <p>
                                Description:
                            </p>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </label>
                        <span className='form-error'>{formErrors.description}</span>
                    </div>
                </div>
                <button className='form-button' type="submit" onClick={handleFormSubmit}>Create Product</button>
            </form>
        </div>
    );
};

export default ProductForm;