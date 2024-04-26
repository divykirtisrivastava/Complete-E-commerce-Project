const express = require('express');
const upload = require('../multerConfig');
const router = express.Router();
const clientController = require('../controlers/clientController');

router.post('/saveClient', upload.single('image'), clientController.saveClient);

router.post('/clientLogin', clientController.clientLogin)

router.post('/createUserCart/:username', clientController.createUserCart)

module.exports = router;
