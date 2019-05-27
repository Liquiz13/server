const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
const User = require('./api/user');
const Friend = require('./api/friend');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://Liquiz:13212312@clust13-sqjxl.mongodb.net/test?retryWrites=true', function (err)  {
    useMongoClient: true;
    useNewUrlParser: true;
    if (err) throw err;
    console.log('Successfully connected');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

const users = [];

app.post('/users', function (req, res) {
    const user = new User ({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email
    });
    user.save().then(result =>{
        console.log(result);
    })
        .catch(err => console.log(err));
    users.push(user);
    res.json(user);
});

app.put('/users/:id', function (req, res) {
    const requestId = req.params.id;
    User.update({_id: requestId}, {$set: {
        name: req.body.name,
        email: req.body.email
        },

})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch (err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

app.get('/users', function (req, res) {
    User.find().exec().then(docs => {
        console.log('From data', docs);
        if (docs) {
            res.status(200).json(docs);
        } else {
            res.status(404).json({message: 'No valid id'})
        }
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
});

app.get('/users/:id', (req, res) => {
    const requestId = req.params.id;
    User.findById(requestId).exec().then(doc => {
        console.log('From data', doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No valid id'})
        }
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
});

app.delete('/users/:id', function (req, res) {
    const requestId = req.params.id;
    const name = req.body.name;

    User.deleteOne({_id: requestId})
        .exec()
        .then(res.send('User ' + name + ' deleted')
        )
        .catch (err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//Friends
friends = [];
app.post('/friends', function (req, res) {
    User.findById(req.body.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            const friend = new Friend ({
                _id: new mongoose.Types.ObjectId(),
                user: req.body.userId,
                accept: req.body.accept
            });
            return friend.save()

        })
        .then(friend => {
            friends.push(friend);
            res.json({
                message: 'friend added',
                addedFriend: {
                    _id: friend._id,
                    user: friend.user
                },
                request: {
                    type: 'GET',
                    url: '127.0.0.1:3000/friends/' + friend._id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

app.get('/friends/userId', function (req, res) {
    Friend.update({_id: userId}, {
        $set: {
            accept: req.body.accept
        }
    });
        res.status(201).json ({message: 'friend added'})
});

app.get('/friends', function (req, res) {
    Friend.find()
        .select('user _id')
        .populate('user', 'name')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                friends: docs.map (doc => {
                    return {
                        _id: doc._id,
                        user: doc.user,
                        request: {
                            type: 'GET',
                            url: '127.0.0.1:3000/friends/' + doc._id
                        }
                    }
                })
        })
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
});

app.get('/friends/:friendId', (req, res) => {
    Friend.findById(req.params.friendId)
        .populate('user', 'name')
        .exec()
        .then(friend => {
        if (friend) {
            res.status(200).json({
                friend: friend,
                request: {
                    type: 'GET',
                    url: '127.0.0.1:3000/friends'
                }
            });
        } else {
            res.status(404).json({message: 'No valid id'})
        }
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
});

app.delete('/friends/:friendId', function (req, res) {
    const name = req.body.name;
    Friend.deleteOne({_id: req.params.friendId})
        .exec()
        .then(res.send('Friend' + name + ' deleted')
        )
        .catch (err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

