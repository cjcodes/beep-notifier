var Alerter = require('./lib/Alerter.js');
var Checker = require('./lib/Checker.js');

var checker = new Checker('HOST', /^ok=1/, {port: 443, path: '/'});

setInterval(function () {
    checker.check(function () {
        Alerter.alert()
    });
}, 30000);

