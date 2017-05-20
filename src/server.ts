import * as express from 'express';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

import * as PostRoutes from './routes/PostRoutes';

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/posts', PostRoutes);

app.use(express.static(__dirname + '/www'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/www/index.html'));
});

app.listen(process.env.PORT || 8080);