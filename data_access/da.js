const Person = require('../models/person');
const Orders = require('../models/orders');
const mongoose = require('mongoose');

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

function savePerson(p) {
    connect2db();
    var p1 = new Person(p);
    p1.save();
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

module.exports = {
    savePersonFromJson: savePerson,
    findPersons: getAllPersons,
    saveOrdersFromJson: saveOrders,
    findOrders: getAllOrders

};