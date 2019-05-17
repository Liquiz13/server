const express = require('express');
const path = require('path');
const app = express();
const usersPath = path.join(__dirname + 'users')

app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use (express.static(usersPath))


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

app.get('/routes/users', function (req, res) {
    res.send('GET request to the homepage');
});

const users = []
app.post('/routes/users', function (req, res) {
    const user = req.body
    users.push({
        name: user.name,
        age: user.age
    })
    res.send('successfully registered')
})

app.put('/routes/users', function (req, res) {
    res.send('Got a PUT request at /user');
});

app.delete('/routes/users', function (req, res) {
    res.send('Got a DELETE request at /user');
});