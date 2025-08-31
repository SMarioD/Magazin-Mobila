const { Product } = require('../models');

exports.postAddToCart = async (req, res) => {
    try {
        const prodId = req.body.productId;
        const user = res.locals.currentUser;
        if (!user) { return res.redirect('/login'); }

        let cart = await user.getCart();
        if (!cart) { cart = await user.createCart(); }

        const existingProducts = await cart.getProducts({ where: { id: prodId } });
        let newQuantity = 1;

        if (existingProducts.length > 0) {
            newQuantity = existingProducts[0].CartItem.quantity + 1;
        }
        
        await cart.addProduct(prodId, { through: { quantity: newQuantity } });
        req.flash('success_msg', 'Produs adăugat în coș!');
        res.redirect('/cart');
    } catch (err) {
        console.log("Eroare la adăugarea în coș:", err);
        res.redirect('/');
    }
};

exports.getCart = async (req, res) => {
    try {
        const user = res.locals.currentUser;
        if (!user) { return res.redirect('/login'); }
        
        const cart = await user.getCart({ include: ['Products'] });

        if (!cart || !cart.Products) {
            return res.render('shop/cart', {
                pageTitle: 'Coșul Tău',
                products: [],
                totalPrice: 0
            });
        }
        
        let totalPrice = 0;
        cart.Products.forEach(p => {
            totalPrice += p.CartItem.quantity * parseFloat(p.price);
        });
        
        res.render('shop/cart', {
            pageTitle: 'Coșul Tău',
            products: cart.Products,
            totalPrice: totalPrice.toFixed(2)
        });
    } catch (err) {
        console.log("Eroare la afișarea coșului:", err);
        res.redirect('/');
    }
};

exports.postCartDeleteItem = async (req, res) => {
    try {
        const prodId = req.body.productId;
        const user = res.locals.currentUser;
        const cart = await user.getCart();
        const products = await cart.getProducts({ where: { id: prodId } });
        
        if (products.length > 0) {
            await products[0].CartItem.destroy();
        }
        
        req.flash('success_msg', 'Produs eliminat din coș.');
        res.redirect('/cart');
    } catch (err) {
        console.log("Eroare la ștergerea din coș:", err);
        res.redirect('/cart');
    }
};