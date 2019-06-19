const express = require ('express');
const router = express.Router();
const passport = require ('passport');
const mongoose = require ('mongoose');
const session = require('express-session');

router.use(session({
    secret: 'secr',
    saveUninitialized: false,
    resave: false
  }));

require('../config/passport');
router.use(passport.initialize())
router.use(passport.session())

router.post('/', (req, res, next) => {
    passport.authenticate('local.signup', function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send('Укажите правильный email или пароль!');
        }
        req.login(user, function(err) {
            if (err) {
            return next(err);
            }
            return res.redirect('/test');
        });
        })(req, res, next);
  });

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
})


module.exports = router;