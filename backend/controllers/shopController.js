const { Product } = require('../models');

exports.getIndex = async (req, res) => {
    try {
        const products = await Product.findAll({ order: [['createdAt', 'DESC']] });
        res.render('shop/index', { 
            pageTitle: 'Bine ai venit!',
            products: products 
        });
    } catch (err) {
        console.log("Eroare la încărcarea produselor:", err);
        res.status(500).send('<h1>A apărut o eroare.</h1>');
    }
};

exports.getProductDetail = async (req, res) => {
    try {
        const prodId = req.params.productId;
        const product = await Product.findByPk(prodId);
        if (!product) {
            return res.redirect('/');
        }
        res.render('shop/product-detail', {
            pageTitle: product.title,
            product: product
        });
    } catch (err) {
        console.log("Eroare la încărcarea detaliilor produsului:", err);
        res.status(500).send('<h1>A apărut o eroare.</h1>');
    }
};