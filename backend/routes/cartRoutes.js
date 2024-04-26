const express = require('express');
const router = express.Router();
const cartController = require('../controlers/cartControllers');

router.get('/getCart/:username', cartController.getCart)
router.post('/saveCart/:username', cartController.saveCart)
router.delete('/deleteCart/:username/:id', cartController.deleteCart)

module.exports = router;