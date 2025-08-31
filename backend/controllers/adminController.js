const { Product } = require('../models');

exports.getProducts = async (req, res) => {
    const products = await Product.findAll();
    res.render('admin/products', {
        pageTitle: 'Admin Products',
        products: products
    });
};
exports.getAddProduct = (req, res) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        editing: false,
        product: {} 
    });
};
exports.postAddProduct = async (req, res) => {
    const { title, imageUrl, price, description } = req.body;
    await Product.create({ title, price, imageUrl, description });
    res.redirect('/admin/products');
};

exports.getEditProduct = async (req, res) => {
    const prodId = req.params.productId;
    const product = await Product.findByPk(prodId);
    if (!product) {
        return res.redirect('/admin/products');
    }
    res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        editing: true,
        product: product 
    });
};

exports.postEditProduct = async (req, res) => {
    const { productId, title, imageUrl, price, description } = req.body;
    const product = await Product.findByPk(productId);
    if (product) {
        await product.update({ title, price, imageUrl, description });
    }
    res.redirect('/admin/products');
};

exports.postDeleteProduct = async (req, res) => {
    const { productId } = req.body;
    const product = await Product.findByPk(productId);
    if (product) {
        await product.destroy();
    }
    res.redirect('/admin/products');
};