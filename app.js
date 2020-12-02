var express = require('express');
var app = express();
var cors = require('cors');


// ADD THESE TWO LINES

app.use(cors());


//app.use(express.bodyParser());


var URLController  = require('./URL/URLController');
app.use('/URL', URLController);
var GroupController  = require('./group/GroupController');
app.use('/group',GroupController);

module.exports = app;
