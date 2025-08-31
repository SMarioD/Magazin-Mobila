const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

router.get('/', shopController.getIndex);

router.get('/products/:productId', shopController.getProductDetail);

module.exports = router;