const sequelize = require('../config/database');
const initUserModel = require('./User');
const initProductModel = require('./Product');
const initCartModel = require('./Cart');
const initCartItemModel = require('./CartItem');
const initOrderModel = require('./Order');
const initOrderItemModel = require('./OrderItem');

const User = initUserModel(sequelize);
const Product = initProductModel(sequelize);
const Cart = initCartModel(sequelize);
const CartItem = initCartItemModel(sequelize);
const Order = initOrderModel(sequelize);
const OrderItem = initOrderItemModel(sequelize);

User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

module.exports = { sequelize, User, Product, Cart, CartItem, Order, OrderItem };