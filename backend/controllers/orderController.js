const { Order } = require('../models');

exports.postOrder = async (req, res) => {
    try {
        const user = res.locals.currentUser;
        const cart = await user.getCart({ include: ['Products'] });
        const products = cart.Products;

        if (!products || products.length === 0) {
            return res.redirect('/cart');
        }

        const order = await user.createOrder();

        await order.addProducts(products.map(product => {
            product.OrderItem = { 
                quantity: product.CartItem.quantity,
                price: product.price
            };
            return product;
        }));

        await cart.setProducts(null);
        
        req.flash('success_msg', 'Comanda a fost plasată cu succes!');
        res.redirect('/orders'); 

    } catch (err) {
        console.log("Eroare la plasarea comenzii:", err);
        res.redirect('/cart');
    }
};

exports.getOrders = async (req, res) => {
    try {
        const user = res.locals.currentUser;
        const orders = await user.getOrders({
            include: ['Products'],
            order: [['createdAt', 'DESC']]
        });

        res.render('shop/orders', {
            pageTitle: 'Comenzile Mele',
            orders: orders
        });
    } catch (err) {
        console.log("Eroare la afișarea comenzilor:", err);
        res.redirect('/');
    }
};