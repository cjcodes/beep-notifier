var fs = require('fs')
  , wav = require('wav')
  , Speaker = require('speaker')
;

var reader, format, repeat
  , stopped = true;

function init() {
    if (format == undefined) {
        var file = fs.createReadStream(__dirname + '/../alarm.wav');
        var reader = new wav.Reader();

        reader.on('format', function (form) {
            format = format;
            file.unpipe();
        });

        file.pipe(reader);
    }
}

exports.alert = function () {
    init();
    if (stopped) {
        play();
    }
};

var stop = exports.stop = function () {
    stopped = true;
    if (reader != undefined) {
        reader.unpipe();
    }
};

var play = function () {
    stopped = false;
    var file = fs.createReadStream(__dirname + '/../alarm.wav');
    reader = new wav.Reader();
    var speaker = new Speaker(format);

    reader.on('format', function (format) {
        reader.pipe(speaker);
    });

    file.pipe(reader);

    file.on('end', function () {
        if (!stopped) {
            repeat = setTimeout(play, 1000);
        }
    });
};
