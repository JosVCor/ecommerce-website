// CategoryService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Update with your backend server URL

const CategoryService = {
    getCategories: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/categories`);
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },
};

export default CategoryService;
