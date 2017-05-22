"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var UserSchema = new Schema({
    'username': String,
    'firstname': String,
    'lastname': String,
    'email': String,
    'password': String,
    'resetpasswordtoken': String,
    'resetpasswordexpires': Date,
    'coverimage': String,
    'profileimage': String,
    'roles': Array
});
UserSchema.pre('save', function (next) {
    var user = this;
    var SALT_FACTOR = 5;
    if (!user.isModified('password'))
        return next();
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err)
            return next(err);
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
};
module.exports = mongoose.model('User', UserSchema);
