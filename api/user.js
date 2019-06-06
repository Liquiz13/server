const mongoose = require ('mongoose');


const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    requests: Array,
    friends: Array,
})

module.exports = mongoose.model('User', userSchema)