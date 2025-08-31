module.exports = (req, res, next) => {
    if (res.locals.isLoggedIn && res.locals.currentUser && res.locals.currentUser.isAdmin) {
        return next();
    }
    res.status(403).render('errors/403', { pageTitle: 'Acces Interzis' });
};