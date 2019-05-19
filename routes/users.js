    
var express = require('express');
var router = express.Router();
var da = require('../data_access/da')


router.get('/', function(req, res, next) {
  da.findPersons(function(err, users) {
    res.render('users/users', {title:'Users in my database', user_list: users});
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
  res.render('users/add', {title: 'Add User'});
});

router.get('/delete', function(req, res){
  da.deleteUser(req.query.id, function(err){
    da.findPersons(function(err, users) {
      res.render('users/users', {title:'User listing', user_list: users});
    });
  });
});

module.exports = router;
