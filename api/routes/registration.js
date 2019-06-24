const express = require ('express');
const router = express.Router();
const passport = require ('passport');
const authController = require ('../controllers/auth')

require('../config/passport');
router.use(passport.initialize())
router.use(passport.session())

router.post('/', authController.auth_reg);


module.exports = router;