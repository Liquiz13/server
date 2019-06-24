const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
const userRoutes = require('./api/routes/users');
const registrationRoutes = require('./api/routes/registration');
const passport = require ('passport');
const index = require('./api/routes/index');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', userRoutes);
app.use('/registration', registrationRoutes);
app.use('/', index);

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