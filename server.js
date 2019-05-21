const express = require('express');
const app = express();

const bodyParser  = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

const users = [];

app.post('/users', function (req, res) {
    const user = {
        name: req.body.name,
        email: req.body.email,
        id: users.length + 1
    };
    users.push(user);
    res.json(user);
});

app.put('/users/:id', function (req, res) {
    const requestId = req.params.id;

    let user = users.filter(user => {
        return user.id == requestId;
    })[0];
    const index = users.indexOf(user);

    const  keys = Object.keys(req.body);

    keys.forEach(key => {
        user [key] = req.body[key];
    });

    users[index] = user;
    res.json(users[index]);
});

app.get('/users', function (req, res) {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const requestId = req.params.id;

    let user = users.filter(user => {
        return user.id == requestId;
    });
    res.json(user[0]);
});

app.delete('/users/:id', function (req, res) {
    const requestId = req.params.id;
    let user = users.filter(user => {
        return user.id == requestId;
    })[0];
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.json('User deleted');
});