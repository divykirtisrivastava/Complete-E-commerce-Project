
const express = require('express');
const upload = require('../multerConfig.js');
const router = express.Router();
const productController = require('../controlers/productController');

router.get('/products', productController.getAllProducts);

router.post('/uploadProduct', upload.single('productImage'), productController.uploadFile);

router.get('/products/:id', productController.getProductById);

router.put('/updateProduct/:id', upload.single('productImage'), productController.updateProduct);

router.get('/productSearch/:value', productController.productSearch);

router.delete('/productDelete/:id', productController.productDelete);

module.exports = router;