// API Service
import axios from 'axios';

const apiService = axios.create({
    baseURL: 'http://localhost:3000',
});

export const createProduct = async (productData) => {
    try {
        const formData = new FormData();

        // Append each key-value pair to the FormData
        Object.entries(productData).forEach(([key, value]) => {
            // If the value is an array, handle it differently (e.g., for categories)
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    formData.append(key, item);
                });
            } else {
                // For other fields (except 'image'), append normally
                if (key !== 'image') {
                    formData.append(key, value);
                } else {
                    // For the 'image' field, append the file directly
                    formData.append(key, value);
                }
            }
        });

        const response = await apiService.post('/api/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};


export const getProductsByCategory = async (category) => {
    try {
        const response = await axios.get(`/api/products/category/${category}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw error;
    }
}