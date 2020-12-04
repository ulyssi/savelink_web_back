var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
var group = require('../db/group');
var user = require('../db/users');
    



router.post('/getall', function (req, res) {
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


module.exports = router;
