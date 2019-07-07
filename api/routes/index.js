const express = require('express');
const router = express.Router();
const passport = require ('passport');
const authController = require ('../controllers/auth')


require('../config/passport');
router.use(passport.initialize())
router.use(passport.session())

 
const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        return res.redirect('/');
    }
}

router.get('/', function (req, res) {
    res.send('Hello World!');
});

router.get('/test', auth, function (req, res) {
    res.send('Autherized');
});


router.post('/login', authController.auth_login);

router.get('/logout', authController.auth_logout)

module.exports = router;