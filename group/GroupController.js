var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
var group = require('./group');



function  checkpassword(req, res){
  return 0; 
//console.log("checkpasswd"+req.body.id+req.body.password);
    var c=1; 
    if(!req.body.id || !req.body.password){
        console.log("no id");
    } else {
       
       Users.filter(function(user){
          if(user.id === req.body.id){
            if(user.password === req.body.password){   
             //res.render('signup', {
               // message: "User Already Exists! Login or choose another user id"});
               console.log('User ok');
               c=0;
            }
          }
          
       });
      
       //res.redirect('/protected_page');
    }
    return c;
 };


router.post('/getall', function (req, res) {
    let  c=checkpassword(req,res);
    console.log(c);
    if ( c !== 0){
        console.log('crtl ko');
        res.status("400");
       res.send("Invalid details!");
       return;
    }
  

    group.getgroup_user(req.body, function (err, count) {

        if (err) {
            res.status(400).json(err);
        }
        else {

            req.body.id = count.insertId;
            res.json(req.body);
        }
    });

});


module.exports = router;
