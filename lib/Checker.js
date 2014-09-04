var http = require('https');

var defaults = {
    port: 80,
    path: '/',
};

var req_params = {}, regex_check = '';
    
function Checker(path, regex, options) {
    req_params = options ? options : defaults;
    req_params['hostname'] = path;

    regex_check = regex;
};

module.exports = Checker;

Checker.prototype.check = function (onError) {
    var req = http.request(req_params, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            if (!data.match(regex_check)) {
                onError(data);
            }
        });
    });

    req.on('error', function (e) {
        console.log(e);
    });

    req.end();
};
