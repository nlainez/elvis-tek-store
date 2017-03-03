'use strict';
const express = require('express');
const app = express();
const elvisTekStore = require('./app');
const passport = require('passport');

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(elvisTekStore.session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', elvisTekStore.router);

elvisTekStore.ioServer(app).listen(app.get('port'), () => {
  console.log('elvisTekStore running on port: ', app.get('port'));
});