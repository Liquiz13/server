const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

exports.users_create = function (req, res, next) {
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
                .then(result => {
                    res.status(200).json(result);
                })
                .catch (err => {
                    res.status(500).json({ error: err})
                });
        }
    }) 
};

exports.users_change = function (req, res) {
    const requestId = req.params.id;
    User.update({_id: requestId}, {$set: {
        name: req.body.name,
        email: req.body.email
        },

})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch (err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.users_get_all =  function (req, res) {
    User.find().exec().then(docs => {
        if (docs) {
            res.status(200).json(docs);
        } else {
            res.status(404).json({message: 'No valid id'})
        }
    })
        .catch(err => {
            res.status(500).json({error: err})
        });
};

exports.users_get_one =  (req, res) => {
    const requestId = req.params.id;
    User.findById(requestId)
    .exec()
    .then(doc => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No valid id'})
        }
    })
        .catch(err => {
            res.status(500).json({error: err})
        });
};

exports.users_delete = function (req, res) {
    const requestId = req.params.id;
    const name = req.body.name;

    User.deleteOne({_id: requestId})
        .exec()
        .then(res.send('User ' + name + ' deleted')
        )
        .catch (err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.users_friendReq = function (req, res) {
    const requestId = req.params.id;
    User.updateOne({_id: requestId}, { $push: {
        requests: req.body.requests
    }
    })
        .exec()
        .then(request => {
            res.status(200).json(request);
        })
        .catch (err => {
            res.status(500).json({ error: err});
        });
};

exports.users_friendAdd = function (req, res) {
    const requestId = req.body.id;
    const ownId = req.params.id;
    User.updateOne({_id: requestId}, { $push: {
        friends: req.body.friends
        }
    })
        .exec()
        .then(user.updateOne({_id: ownId}, { $push: {
            friends: req.body.id
            }
        })   
            .exec()
            .then(result => { 
                res.status(200).json(result);
            })
        )
        .catch(err => {
            res.status(500).json({error: err});
        });
};