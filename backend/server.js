require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { sequelize, User } = require('./models');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const shopRoutes = require('./routes/shopRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const isAdmin = require('./middleware/adminMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const sessionStore = new SequelizeStore({ db: sequelize });
app.use(session({
    secret: 'secret-key-mobila-super-secreta',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.use(async (req, res, next) => {
    if (!req.session.userId) {
        res.locals.isLoggedIn = false;
        res.locals.currentUser = null;
    } else {
        try {
            const user = await User.findByPk(req.session.userId);
            res.locals.isLoggedIn = true;
            res.locals.currentUser = user;
        } catch (err) {
            console.log(err);
            res.locals.isLoggedIn = false;
            res.locals.currentUser = null;
        }
    }
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    
    next();
});

app.use('/admin', isAdmin, adminRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use(shopRoutes);

async function startServer() {
    try {
        await sequelize.sync();
        console.log('Baza de date a fost sincronizată.');
        app.listen(PORT, () => {
            console.log(`Serverul rulează pe http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Nu s-a putut porni serverul:', error);
    }
}

startServer();