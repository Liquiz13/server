const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
const User = require('./api/user');
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
    user.save().then(result => {
        res.status(200).json(result);
    })
    .catch (err => {
        res.status(500).json({ error: err})
    });
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
            res.status(200).json(result);
        })
        .catch (err => {
            res.status(500).json({
                error: err
            });
        });
});

app.get('/users', function (req, res) {
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

app.get('/users/:id', (req, res) => {
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

app.delete('/users/:id', function (req, res) {
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

app.post ('/users/:id/friends/', function (req, res) {
const requestId = req.params.id;
User.findOneAndUpdate({_id: requestId}, {$set: {
    request: req.body.request
    }
})
    .exec()
    .then(request => {
        res.status(200).json(request);
    })
    .catch (err => {
        res.status(500).json({ error: err});
    });
});

app.put ('/users/:id/friends/', function (req, res) {
const requestId = req.body.id;
const ownId = req.params.id;
    User.updateOne({_id: requestId}, {$set: {
        friend: req.body.friend
    }
})
    .exec()
    .then(User.updateOne({_id: ownId}, {$set: {
        friend: req.body.id
    }
})
    .exec()
    .then(friend => {
        res.status(200).json('You get a new friend' + friend);
    })
)
    .catch(err => {
        res.status(500).json({error: err})
    })
})