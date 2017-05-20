"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PostRoutes = require("./routes/PostRoutes");
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/posts', PostRoutes);
app.use(express.static(__dirname + '/www'));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/www/index.html'));
});
app.listen(process.env.PORT || 8080);
