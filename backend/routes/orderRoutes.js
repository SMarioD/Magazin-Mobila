const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

const isAuthenticated = (req, res, next) => {
    if (!req.session.isLoggedIn) { return res.redirect('/login'); }
    next();
};

router.post('/create-order', isAuthenticated, orderController.postOrder);

router.get('/orders', isAuthenticated, orderController.getOrders);

module.exports = router;