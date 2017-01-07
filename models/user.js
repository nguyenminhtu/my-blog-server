var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    fullname: {type: String,required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, bcrypt: true},
    level: {type: Number, default: 1},
    created_at: {type: Date, default: Date.now}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);