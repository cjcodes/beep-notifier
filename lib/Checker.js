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

var errors = 0;
Checker.prototype.check = function (onError, onFixed) {
    var req = http.request(req_params, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            if (!data.match(regex_check)) {
                errors++;

                if (errors > 1) {
                    onError(data);
                }
            } else {
                errors = 0;
                onFixed();
            }
        });
    });

    req.on('error', function (e) {
        console.log(e);
    });

    req.end();
};
