const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    register_date: {
        type: Date,
        default: Date.now,
    },
    password: {
        type: String,
        required: true,
    }
});


module.exports = mongoose.model('Users', UserSchema);