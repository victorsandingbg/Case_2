var express = require('express');
var router = express.Router();
const da = require('../data_access/da')
const bcrypt = require('bcrypt');

router.get('/', function(req, res){
    res.render('login', {title: 'Login'});
});

router.post('/', function(req, res) {
    da.getUserbyUsername(req.body['username'], function(err, user) {
        if(user) {
            bcrypt.compare(req.body['password'], user.password, function(err,answer) {
                if(answer) {
                    req.session.userid = user._id;
                    res.redirect('/dashboard');
                }
                else {
                    res.redirect('login', 401);
                }
            });
        }
        else {
            console.log("nope sorry, no cake for you");
            res.redirect('login', 401);
        }
    });
   
    
});

  module.exports = router;