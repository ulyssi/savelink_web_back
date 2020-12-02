var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
var URL = require('./URL');
var user = require('../users/users');
    


 // Gestion des URLS.
router.post('/getall', function (req, res) {
    var c=user.checkpassword(req,res);
    if ( c !== 0){
        console.log('crtl ko');
        res.status("400");
       res.send("Invalid details!");
       return;
    }
    URL.geturl(function (err, rows) {
    
        if (err) {
            res.status(400).json(err);
        }
        else {
            res.json(rows);
        }
    });
    
});



router.post('/urlraw', function (req, res) {
    
    var c=user.checkpassword(req,res);
    if ( c !== 0){
        console.log('crtl ko');
        res.status("400");
       res.send("Invalid details!");
       return;
    }
    URL.geturlraw(function (err, rows) {
    
        if (err) {
            res.status(400).json(err);
        }
        else {
            res.json(rows);
        }
    });
    
});
router.post('/urlraw_key', function (req, res) {

    var c=user.checkpassword(req,res);
    if ( c !== 0){
        console.log('crtl ko');
        res.status("400");
       res.send("Invalid details!");
       return;
    }
    URL.geturlraw_key(req.body,function (err, rows) {
        if (err) {
            res.status(400).json(err);
        }
        else {
            res.json(rows);
        }
    });
});

router.post('/create', function (req, res) {
    var c=user.checkpassword(req,res);
    console.log(req.body.password)
    if ( c !== 0){
        console.log('crtl ko');
        res.status("400");
       res.send("Invalid details!");
       return;
    }
    URL.createurl(req.body.url, function (err, count) {

        if (err) {
            res.status(400).json(err);
        }
        else {

            req.body.id = count.insertId;
            res.json(req.body);
        }
    });
});


router.post('/update', function (req, res) {
    var c=user.checkpassword(req,res);
    if ( c !== 0){
        console.log('crtl ko');
        res.status("400");
       res.send("Invalid details!");
       return;
    }
    URL.updateurl(req.body.url, function (err, count) {

        if (err) {
            res.status(400).json(err);
        }
        else {

            req.body.id = count.insertId;
            res.json(req.body);
        }
    });
});

router.post('/delete', function (req, res) {
    var c=user.checkpassword(req,res);
    if ( c !== 0){
        console.log('crtl ko');
        res.status("400");
       res.send("Invalid details!");
       return;
    }
    URL.deleteurl(req.body.url, function (err, count) {
        if (err) {
            res.status(400).json(err);
        }
        else {
            res.json({});
        }
    });
});

router.post('/deletebyshortcut', function (req, res) {
 
    var c=user.checkpassword(req,res);
    if ( c !== 0){
        console.log('crtl ko');
        res.status("400");
       res.send("Invalid details!");
       return;
    }
    URL.deleteurlbyshortcut(req.body.url, function (err, count) {
        if (err) {
            res.status(400).json(err);
        }
        else {
            res.json({});
        }
    });
});

module.exports = router;
