const Person = require('../models/person');
const Orders = require('../models/orders');
const Products = require('../models/products');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

function connect2db() {
    mongoose.connect('mongodb://localhost:27017/jsdb_3',
        { useNewUrlParser: true });

    mongoose.connection.once('open', function () {
        console.log("Connection to MongoDB made...");
    }).on('error', function (error) {
        console.log("Error connecting to MongoDB. Error:", error);
    });
}

function connect3db() {
    mongoose.connect('mongodb://localhost:27017/spareparts',
        { useNewUrlParser: true });

    mongoose.connection.once('open', function () {
        console.log("Connection to MongoDB made...");
    }).on('error', function (error) {
        console.log("Error connecting to MongoDB. Error:", error);
    });
}

function savePerson(p, cb) {
    connect2db();
    var p1 = new Person(p);
    bcrypt.hash(p1.password, 10, function(err, hash){
        p1.password = hash;
        p1.save(function(err){
            if(err) {
                console.log("Error creating user" + err)
            }
            cb(err);
        });
    });
}

function search(pattern, cb) {
    connect2db();
    Person.find({$or: [
                        {first_name: {$regex: '.*' + pattern + '.*'}},
                        {last_name:{$regex: '.*' + pattern + '.*'}}
                      ]
    }, function(err, users){
        cb(err, users);
    });
}

function deleteUser(id, cb) {
    connect2db();
    Person.deleteOne({"_id": id}, function (err, res) {
       if(err) {
           console.log("Error deleting user" + err);
       }
       cb(err);
    });
}

function saveOrders(p) {
    connect3db();
    var p1 = new Orders(p);
    p1.save();
}

function getAllPersons(cb) {
    connect2db();
    Person.find(function(err, users) {
        if(err) {
            console.log('Error getting users' + err);
        }
        cb(err, users);
    });
}

function getAllOrders(cb) {
    connect3db();
    Orders.find(function(err, order) {
        if(err) {
            console.log('Error getting orders' + err);
        }
        cb(err, order);
    });
}

function findProducts(cb) {
    connect3db();
    Products.find(function(err, products){
        if(err) {
            console.log('Error getting products' + err);
        }
        cb(err, products);
    });

}

function getPersonByUsername(username, cb) {
    connect2db();
    Person.findOne({'username': username}, function(err, user) {
        cb(err, user);
    });
}

function getPersonById(userid, cb){
    connect2db();
    Person.findOne({'_id': userid}, function(err, user){
        cb(err, user);
    });
}


module.exports = {
    savePersonFromForm: savePerson,
    findPersons: getAllPersons,
    saveOrdersFromJson: saveOrders,
    findOrders: getAllOrders,
    search: search,
    deleteUser: deleteUser,
    findProducts: findProducts,
    getUserbyUsername: getPersonByUsername,
    getUserById: getPersonById,
};