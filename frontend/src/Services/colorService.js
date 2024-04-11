// ColorService.js
const ColorService = {
    getColors: async () => {
        try {
            const response = await fetch('http://localhost:3000/api/colors');
            const colors = await response.json();
            return colors;
        } catch (error) {
            console.error('Error fetching colors:', error);
            throw error;
        }
    },
};

export default ColorService;