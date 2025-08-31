const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.getRegister = (req, res) => {
    res.render('auth/register', { pageTitle: 'Înregistrare' });
};

exports.postRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        await User.create({ username, email, password });
        req.flash('success_msg', 'Cont creat cu succes! Acum te poți autentifica.');
        res.redirect('/login');
    } catch (err) {
        req.flash('error_msg', 'A apărut o eroare la înregistrare. Încearcă alt email/username.');
        res.redirect('/register');
    }
};

exports.getLogin = (req, res) => {
    res.render('auth/login', { pageTitle: 'Autentificare' });
};

exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            req.flash('error_msg', 'Email sau parolă incorectă.');
            return res.redirect('/login');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            req.session.userId = user.id;
            req.session.isLoggedIn = true;
            return req.session.save(err => {
                if (err) console.log(err);
                req.flash('success_msg', 'Te-ai autentificat cu succes!');
                res.redirect('/');
            });
        }
        req.flash('error_msg', 'Email sau parolă incorectă.');
        res.redirect('/login');
    } catch (err) {
        console.log(err);
        res.redirect('/login');
    }
};

exports.postLogout = (req, res) => {
    req.session.destroy(err => {
        if (err) console.log(err);
        res.redirect('/');
    });
};