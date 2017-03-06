'use strict';
const express = require('express');
const app = express();
const elvisTekStore = require('./app');
const passport = require('passport');
const methodOverride	= require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded( { extended : true } ));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(elvisTekStore.session);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride());

app.use('/', elvisTekStore.router);

app.listen(app.get('port'), () => {
  console.log('elvisTekStore running on port: ', app.get('port'));
});