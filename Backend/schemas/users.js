const mongoose = require('mongoose');

const users = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
});

const Users = new mongoose.model('user', users);

module.exports = Users;