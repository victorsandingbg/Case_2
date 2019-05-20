    
var express = require('express');
var router = express.Router();
var da = require('../data_access/da')


router.get('/', function(req, res, next) {
  da.findPersons(function(err, users) {
    var userid = req.session['userid'];
    res.render('users/users', {title:'Users in my database', user_list: users, userid: userid});
  });

});

router.post('/', function(req, res, next) {
  da.savePersonFromForm(req.body, function(err){
    da.findPersons(function(err, users) {
      res.render('users/users', {title:'User listing', user_list: users});
    });
  });
});

router.get('/add', function(req, res){
  var userid = req.session['userid'];
  res.render('users/add', {title: 'Add User', userid: userid});
});

router.get('/delete', function(req, res){
  da.deleteUser(req.query.id, function(err){
    da.findPersons(function(err, users) {
      res.render('users/users', {title:'User listing', user_list: users});
    });
  });
});

router.get('/add_friend', function(req,res) {
  da.addFriend(req.session['userid'], req.query.id, function(err){
    da.findPersons(function(err, users) {
      var userid = req.session['userid'];
    res.render('users/users', {title:'Users in my database', user_list: users, userid: userid});
    });
  });
});

module.exports = router;
