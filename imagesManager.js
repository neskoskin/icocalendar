const fs = require('fs');
const request = require('request');
const path = require('path');
var https = require('https');
const TARGET_PATH = path.join(__dirname, '/assets/icons/');

exports.writeIcon = function (uri, filename, callback) {
    var fullUri = 'https:' + uri;
    var dest = TARGET_PATH + filename + '.jpg';
    var file = fs.createWriteStream(dest);
    var request = https.get(fullUri, function (httpResponse) {
        httpResponse.pipe(file);
        file.on('finish', function () {
            file.close(callback);  // close() is async, call cb after close completes.
        });
    }).on('error', function (err) { // Handle errors
        filesystem.unlink(dest); // Delete the file async. (But we don't check the result)
        if (callback) cb(err.message);
    });
    // request.head(uri, function (err, res, body) {
    //     request(fullUri).pipe(fs.createWriteStream(TARGET_PATH + filename + '.jpg')).on('close', callback);
    // });
    // request(fullUri, { encoding: null }, function (error, response, body) {
    //     fs.writeFile(TARGET_PATH + filename + '.jpg', body, callback, function (err) { });
    // });
};
exports.readIcon = function (path) {
    const fileToCheck = TARGET_PATH + path;

    if (!fs.existsSync(fileToCheck)) {
        return true;
    }
}