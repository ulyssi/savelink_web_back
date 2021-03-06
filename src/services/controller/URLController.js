
var bodyParser = require('body-parser');
var express = require('express');

// Personal require
var URL = require('../db/URL');
var user = require('../db/users');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


function return_400(res,str_info){
       res.status("400");
       res.send(str_info);
}

router.post('/getall_user', function (req, res) {
    var c=user.checkpassword(req,res);

    if ( c!==0) return return_400(res,"Invalid User/pass");     
    URL.geturl_user(req.body,function (err, rows) {
      if (err) return_400(res.status(400).json(err),"Database error")
      else res.json(rows);
    });
});

router.post('/urlraw', function (req, res) {
    var c=user.checkpassword(req,res);
    if ( c!==0) return return_400(res,"Invalid User/pass");      
    URL.geturlraw(function (err, rows) {
      if (err) return_400(res.status(400).json(err),"Database error")
      else res.json(rows);
    });
});

router.post('/urlraw_key', function (req, res) {
    var c=user.checkpassword(req,res);
    if ( c!==0) return return_400(res,"Invalid User/pass");    
   
    URL.geturlraw_key(req.body,function (err, rows) {
      if (err) return_400(res.status(400).json(err),"Database error")
      else res.json(rows);
    });
});

router.post('/create', function (req, res) {
    var c=user.checkpassword(req,res);
    if ( c!==0) return return_400(res,"Invalid User/pass");    
   
    URL.createurl(req.body,function (err, rows) {
      if (err) return_400(res.status(400).json(err),"Database error")
      else res.json(rows);
    });
   
});

router.post('/update', function (req, res) {
    var c=user.checkpassword(req,res);
    if ( c!==0) return return_400(res,"Invalid User/pass");    
   
    URL.updateurl(req.body.url,function (err, rows) {
      if (err) return_400(res.status(400).json(err),"Database error")
      else res.json(rows);
    });
});

router.post('/delete', function (req, res) {
    var c=user.checkpassword(req,res);
    if ( c!==0) return return_400(res,"Invalid User/pass");    
   
    URL.deleteurl(req.body.url,function (err, rows) {
      if (err) return_400(res.status(400).json(err),"Database error")
      else res.json(rows);
    });
});

router.post('/deletebyshortcut', function (req, res) {
    var c=user.checkpassword(req,res);
    if ( c!==0) return return_400(res,"Invalid User/pass");    
   
    URL.deleteurlbyshortcut(req.body.url,function (err, rows) {
      if (err) return_400(res.status(400).json(err),"Database error")
      else res.json(rows);
    });
});


module.exports = router;
