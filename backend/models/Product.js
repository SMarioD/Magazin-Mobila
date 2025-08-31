const { DataTypes, Model } = require('sequelize');

class Product extends Model {}

function initProductModel(sequelize) {
    Product.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Product'
    });
    return Product;
}

module.exports = initProductModel;