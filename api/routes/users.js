const express = require ('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../user');
const users = [];

router.post('/', function (req, res) {
    const user = new User ({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    user.save().then(result => {
        res.status(200).json(result);
    })
    .catch (err => {
        res.status(500).json({ error: err})
    });
    users.push(user);
    res.json(user);
});

router.put('/:id', function (req, res) {
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
});

router.get('/', function (req, res) {
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
});

router.get('/:id', (req, res) => {
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
});

router.delete('/:id', function (req, res) {
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
});

module.exports = router;