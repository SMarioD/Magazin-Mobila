const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

const isAuthenticated = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
};

router.post('/cart', isAuthenticated, cartController.postAddToCart);

router.get('/cart', isAuthenticated, cartController.getCart);

router.post('/cart-delete-item', isAuthenticated, cartController.postCartDeleteItem);

module.exports = router;