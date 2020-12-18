var bodyParser = require('body-parser');
var express = require('express');

// Personal require
var url_group = require('../db/url_group');
var user = require('../db/users');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));



function return_400(res,str_info){
       res.status("400");
       res.send(str_info);
}


router.post('/geturl_groupall_raw', function (req, res) {
  var c=user.checkpassword(req,res);
  if ( c!==0) return return_400(res,"Invalid User/pass");     
  url_group.geturl_groupall_raw(req.body,function (err, rows) {
    if (err) return_400(res.status(400).json(err),"Database error")
    else res.json(rows);
  });
});

router.post('/geturl_groupuser', function (req, res) {
    var c=user.checkpassword(req,res);
    if ( c!==0) return return_400(res,"Invalid User/pass");     
    url_group.geturl_groupuser(req.body,function (err, rows) {
      if (err) return_400(res.status(400).json(err),"Database error")
      else res.json(rows);
    });
});

router.post('/geturl_groupuser_raw', function (req, res) {
    var c=user.checkpassword(req,res);
    if ( c!==0) return return_400(res,"Invalid User/pass");      
    url_group.geturl_groupuser_raw(req.body,function (err, rows) {
      if (err) return_400(res.status(400).json(err),"Database error")
      else res.json(rows);
    });
});

router.post('/geturl_groupuserraw_key', function (req, res) {
    var c=user.checkpassword(req,res);
    if ( c!==0) return return_400(res,"Invalid User/pass");    
   
    url_group.geturl_groupuserraw_key(req.body,function (err, rows) {
      if (err) return_400(res.status(400).json(err),"Database error")
      else res.json(rows);
    });
});

router.post('/create', function (req, res) {
    var c=user.checkpassword(req,res);
    if ( c!==0) return return_400(res,"Invalid User/pass");    
   
    url_group.createurl_group(req.body,function (err, rows) {
      if (err) return_400(res.status(400).json(err),"Database error")
      else res.json(rows);
    });
   
});

router.post('/update', function (req, res) {
    var c=user.checkpassword(req,res);
    if ( c!==0) return return_400(res,"Invalid User/pass");    
   
    url_group.updateurl_group(req.body,function (err, rows) {
      if (err) return_400(res.status(400).json(err),"Database error")
      else res.json(rows);
    });
});

router.post('/delete', function (req, res) {
    var c=user.checkpassword(req,res);
    if ( c!==0) return return_400(res,"Invalid User/pass");    
   
    url_group.deleteurl_group(req.body,function (err, rows) {
      if (err) return_400(res.status(400).json(err),"Database error")
      else res.json(rows);
    });
});

router.post('/deletebyshortcut', function (req, res) {
    var c=user.checkpassword(req,res);
    if ( c!==0) return return_400(res,"Invalid User/pass");    
   
    url_group.deleteurl_groupbyshortcut(req.body,function (err, rows) {
      if (err) return_400(res.status(400).json(err),"Database error")
      else res.json(rows);
    });
});


module.exports = router;
