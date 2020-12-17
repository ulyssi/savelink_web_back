var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
var user = require ('./src/services/db/users');
user.init(); 
var URLController  = require('./src/services/controller/URLController');

app.use('/URL', URLController);
var GroupController  = require('./src/services/controller/GroupController');
app.use('/group',GroupController);
var GroupController  = require('./src/services/controller/URLGroupController');
app.use('/URLGroup',GroupController);
module.exports = app;
