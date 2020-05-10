const mongoose = require('mongoose');
const Schema = mongoose.Schema;

userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

let Users = mongoose.model('user', userSchema);
module.exports = Users;