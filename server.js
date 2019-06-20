const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
const User = require('./api/user');
const userRoutes = require('./api/routes/users');
const registrationRoutes = require('./api/routes/registration');
const session = require('express-session');
const passport = require ('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', userRoutes);
app.use('/registration', registrationRoutes);
app.use(session({
  secret: 'secr',
  saveUninitialized: false,
  resave: false
}));

mongoose.connect('mongodb+srv://Liquiz:13212312@clust13-sqjxl.mongodb.net/test?retryWrites=true', function (err)  {
    useMongoClient: true;
    useNewUrlParser: true;
    if (err) throw err;
    console.log('Successfully connected');
 });

require('./api/config/passport');
app.use(passport.initialize())
app.use(passport.session())

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

  
const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        return res.redirect('/');
    }
}


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/test', auth, function (req, res) {
    res.send('Autherized');
});

app.post ('/users/:id/friends/', function (req, res) {
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
});

app.put ('/users/:id/friends/', function (req, res) {
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
})


app.post('/login', (req, res, next) => {
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

app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
})