var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
var group = require('../db/group');
var user = require('../db/users');
    



router.post('/getgroup_user', function (req, res) {
    let  c=user.checkpassword(req,res);
    if ( c !== 0){
      
        res.status("400");
       res.send("Invalid details!");
       return;
    }
      group.getgroup_user(req.body, function (err, rows) {

        if (err)  res.status(400).json(err);
        else {
            res.json(rows);
        }
    });

});

router.post('/creategroup', function (req, res) {
    let  c=user.checkpassword(req,res);
    if ( c !== 0){
      
        res.status("400");
       res.send("Invalid details!");
       return;
    }
      group.create_group(req.body, function (err, rows) {

        if (err)  res.status(400).json(err);
        else {
            res.json(rows);
        }
    });

});

router.post('/updategroup', function (req, res) {
    let  c=user.checkpassword(req,res);
    if ( c !== 0){
      
        res.status("400");
       res.send("Invalid details!");
       return;
    }
      group.updategroup(req.body, function (err, rows) {

        if (err)  res.status(400).json(err);
        else {
            res.json(rows);
        }
    });

});

router.post('/deletegroup', function (req, res) {
    let  c=user.checkpassword(req,res);
    if ( c !== 0){
      
        res.status("400");
       res.send("Invalid details!");
       return;
    }
      group.deletegroup(req.body, function (err, rows) {

        if (err)  res.status(400).json(err);
        else {
            res.json(rows);
        }
    });

});


router.post('/removeuserfromgroup', function (req, res) {
    let  c=user.checkpassword(req,res);
    if ( c !== 0){
      
        res.status("400");
       res.send("Invalid details!");
       return;
    }
      group.removeuserfromgroup(req.body, function (err, rows) {

        if (err)  res.status(400).json(err);
        else {
            res.json(rows);
        }
    });

});

router.post('/addusertogroup', function (req, res) {
    let  c=user.checkpassword(req,res);
    if ( c !== 0){
      
        res.status("400");
       res.send("Invalid details!");
       return;
    }
      group.addusertogroup(req.body, function (err, rows) {

        if (err)  res.status(400).json(err);
        else {
            res.json(rows);
        }
    });

});

module.exports = router;
