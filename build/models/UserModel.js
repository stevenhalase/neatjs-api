"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    'username': String,
    'firstname': String,
    'lastname': String,
    'email': String,
    'password': String,
    'roles': Array
});
module.exports = mongoose.model('User', UserSchema);
