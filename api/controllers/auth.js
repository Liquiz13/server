const User = require('../models/user');
const passport = require ('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.auth_login = (req, res, next) => {
    passport.authenticate('local.signup', function(err, user) {
        if (err) {
            return next(err);
        }
        if (user.length < 1) {
            return res.status(401).json({
              message: 'Auth failed!'
            });
        }
        bcrypt.compare (req.body.password, user.password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: 'Auth failed!'
            })
          }
          if (result) { 
            const token = jwt.sign({
              email: user.email,
              userId: user._id
            }, 
            process.env.SECRET,
            {
              expiresIn: "2h"
            })
              return res.status(200).json({
                message: 'Auth succsess',
                token: token
              })
          }
        })
    })(req, res, next);
};

exports.auth_reg = function(req, res, next) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          res.send('Пользователь с таким логином уже существует');
        } else { 
          bcrypt.hash(req.body.password, 10, function (err, hash){
              if (err) {
                  return res.status(500).json ({
                      error: (err)
                  })
              } else {
                  const user = new User ({
                      _id: new mongoose.Types.ObjectId(),
                      name: req.body.name,
                      email: req.body.email,
                      password: hash
                  })
                  user.save()
                    .then(res.send('please login'))
              }
          })
        }
        })
      .catch(next);
};

          

exports.auth_logout = (req, res) => {
    req.logOut();
    res.redirect('/');
}