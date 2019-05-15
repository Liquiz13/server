var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

const users = []
app.post('/users', function (req, res) {
    const user = req.body
    users.push({
        name: user.name,
        age: user.age
    })
    res.send('successfully registered')
})
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

app.get('/', function (req, res) {
    res.send('GET request to the homepage');
});

app.post('/', function (req, res) {
    res.send('POST request to the homepage');
});

app.delete('/', function (req, res) {
    res.send('Got a DELETE request at /user');
});

app.put('/', function (req, res) {
    res.send('Got a PUT request at /user');
});