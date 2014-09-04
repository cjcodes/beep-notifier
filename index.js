var dotenv = require('dotenv');
var Alerter = require('./lib/Alerter.js');
var Checker = require('./lib/Checker.js');

dotenv.load();

var checker = new Checker(
    process.env.ALERTER_HOSTNAME,
    new RegExp(process.env.ALERTER_REGEX),
    {
        port: process.env.ALERTER_PORT,
        path: process.env.ALERTER_PATH
    }
);

setInterval(function () {
    checker.check(function () {
        Alerter.alert()
    });
}, 3000);

