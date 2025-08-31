const { Model } = require('sequelize');

class Cart extends Model {}

function initCartModel(sequelize) {
    Cart.init({}, { sequelize, modelName: 'Cart' });
    return Cart;
}

module.exports = initCartModel