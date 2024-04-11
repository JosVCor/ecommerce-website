const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Set a file size limit (optional)
});

// Define routes for product-related operations
router.get('/category/:category', productController.getProductsByCategory);
router.get('/:id', productController.getProductById);
router.get('/', productController.getAllProducts);
router.post('/', upload.single('image') , productController.createProduct);
router.put('/:id', upload.single('image'), productController.updateProductById);
router.delete('/:id', productController.deleteProductById);

module.exports = router;