const mongoose = require('mongoose');
const { URL } = require('./config');
const chalk = require('chalk');

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

function dbconnection () {
    mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('connected', function(){
        console.log(connected("Mongoose default connection is open to ", URL));
    });
    mongoose.connection.on('error', function(err){
        console.log(error("Mongoose default connection has occured "+err+" error"));
    });
    mongoose.connection.on('disconnected', function(){
        console.log(disconnected("Mongoose default connection is disconnected"));
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        })
    })
}

module.exports = dbconnection;