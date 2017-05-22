import * as express from 'express';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
var session = require('express-session')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

import * as PostRoutes from './routes/PostRoutes';
import * as UserRoutes from './routes/UserRoutes';
import * as AuthRoutes from './routes/AuthRoutes';
import * as User from './models/UserModel';

mongoose.connect('mongodb://localhost/neatjs');

const app: express.Application = express();

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
     // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
});

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));

app.use(session({ secret: 'session secret key' }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
  User.findOne({ email: email }, function(err, user: any) {
    // console.log('User.findOne', user);
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect email address.' });
    user.comparePassword(password, function(err, isMatch) {
      // console.log('user.schema.methods.comparePassword', isMatch, err);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
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