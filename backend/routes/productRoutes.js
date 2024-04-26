
const express = require('express');
const upload = require('../multerConfig');
const router = express.Router();
const productController = require('../controlers/productController');

router.get('/products', productController.getAllProducts);

router.post('/uploadProduct', upload.single('image'), productController.uploadFile);

router.get('/products/:id', productController.getProductById);

router.put('/updateProduct/:id', productController.updateProduct);

router.get('/productSearch/:value', productController.productSearch);

router.delete('/productDelete/:id', productController.productDelete);

// Define other product-related routes...

module.exports = router;