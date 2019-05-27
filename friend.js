const mongoose = require ('mongoose');

const friendSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
     user: {type: 
        mongoose.Schema.Types.ObjectId, 
        ref: 'User', required: true}
});

module.exports = mongoose.model('Friend', friendSchema);