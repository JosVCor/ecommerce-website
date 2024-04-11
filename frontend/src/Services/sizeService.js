// SizeService.js
const SizeService = {
    getSizes: async () => {
        try {
            const response = await fetch('http://localhost:3000/api/sizes');
            const sizes = await response.json();
            return sizes;
        } catch (error) {
            console.error('Error fetching sizes:', error);
            throw error;
        }
    },
};

export default SizeService;