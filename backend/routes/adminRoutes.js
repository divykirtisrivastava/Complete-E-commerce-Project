const express = require('express');
const router = express.Router();
const adminController = require('../controlers/adminController');


router.post('/adminLogin', adminController.getAdminLogin)

module.exports = router;