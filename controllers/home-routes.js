//routes related to rendering the homepage, login, and signup pages.

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage', {loggedIn: req.session.loggedIn, username: req.session.username});
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});


module.exports = router;