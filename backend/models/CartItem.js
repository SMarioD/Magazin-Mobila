const { DataTypes, Model } = require('sequelize');

class CartItem extends Model {}

function initCartItemModel(sequelize) {
    CartItem.init({
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, { sequelize, modelName: 'CartItem' });
    return CartItem;
}

module.exports = initCartItemModel;