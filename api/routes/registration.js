const express = require ('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../user');
const passport = require ('passport');

require('../config/passport');
router.use(passport.initialize())
router.use(passport.session())


router.post('/', function(req, res, next) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          res.send('Пользователь с таким логином уже существует');
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            password: req.body.password,
            email: req.body.email,
            name: req.body.name
    });

          user
            .save()
            .then(user => {
              req.login(user, function(err) {
                if (err) {
                  return next(err);
                }
                return res.redirect('/test');
              });
            })
        }
      })
      .catch(next);
  });


  module.exports = router;