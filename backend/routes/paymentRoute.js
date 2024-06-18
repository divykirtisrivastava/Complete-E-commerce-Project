const express = require('express');
const router = express.Router();

let paymentController = require('../controlers/paymentController')

router.post('/create-order', paymentController.createOrder)
router.post('/verify-payment', paymentController.verifyPayment)

module.exports = router