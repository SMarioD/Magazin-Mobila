const { Model } = require('sequelize');

class Order extends Model {}

function initOrderModel(sequelize) {
    Order.init({}, { sequelize, modelName: 'Order' });
    return Order;
}

module.exports = initOrderModel;