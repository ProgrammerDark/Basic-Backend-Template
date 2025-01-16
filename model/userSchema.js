const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    role:{
        type: String,
        required: true,
        default: 'user,admin'
    }
},
{
    timestamps: true,
    versionKey: false,
    collection: 'User'
});

const User = module.exports = mongoose.model('User', Schema);

module.exports = User;