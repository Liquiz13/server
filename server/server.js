const express = require('express');
const app = express();

const bodyParser  = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.send('Hello World!');
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

app.get('/', function (req, res) {
    const user = req.body;
    console.log(req);
    const newUser = {
        name: user.name,
        age: user.age
    };
    user.push(newUser);
    res.send(newUser);
});

const users = []
app.post('/', function (req, res) {
    const user = req.body;
    console.log(req);
    const newUser = {
        name: user.name,
        age: user.age
    };
    users.push(newUser);
    res.send(newUser);
});

app.put('/', function (req, res) {
    const user = req.body;
    console.log(req);
    const newUser = {
        name: user.name,
        age: user.age
    };
    users.push(newUser);
    res.send(newUser);
});

app.delete('/', function (req, res) {
    const user = req.body;
    console.log(req);
    const newUser = {
        name: user.name,
        age: user.age
    };
    delete (newUser);
    res.send ('Данные удалены')
});