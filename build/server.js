"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const PostRoutes = require("./routes/PostRoutes");
const UserRoutes = require("./routes/UserRoutes");
const AuthRoutes = require("./routes/AuthRoutes");
const User = require("./models/UserModel");
mongoose.connect('mongodb://localhost/neatjs');
const app = express();
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(session({ secret: 'session secret key' }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, done) {
    User.findOne({ email: email }, function (err, user) {
        if (err)
            return done(err);
        if (!user)
            return done(null, false, { message: 'Incorrect email address.' });
        user.comparePassword(password, function (err, isMatch) {
            if (isMatch) {
                return done(null, user);
            }
            else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        });
    });
}));
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
app.use('/auth', AuthRoutes);
app.use('/posts', PostRoutes);
app.use('/users', UserRoutes);
app.use(express.static(__dirname + '/www'));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/www/index.html'), {
        user: req.user
    });
});
app.listen(process.env.PORT || 8080);
