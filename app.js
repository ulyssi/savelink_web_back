var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
var URLController  = require('./src/URL/URLController');
app.use('/URL', URLController);
var GroupController  = require('./src/group/GroupController');
app.use('/group',GroupController);
module.exports = app;
