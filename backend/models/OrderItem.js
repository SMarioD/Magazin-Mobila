const { DataTypes, Model } = require('sequelize');

class OrderItem extends Model {}

function initOrderItemModel(sequelize) {
    OrderItem.init({
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, { sequelize, modelName: 'OrderItem' });
    return OrderItem;
}

module.exports = initOrderItemModel;