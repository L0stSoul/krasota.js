module.exports = function(KrasotaAPI) {

var FS = require('fs'),
    Ignore = require('fstream-ignore'),
    KrasotaAPI = KrasotaAPI.api;

return function(options, args) {

    var files = [];
    Ignore({ path: args.directory, ignoreFiles: ['.krasotaignore', '.gitignore1'] })
        .on('child', function (c) {
            //console.error(c.path.substr(c.root.path.length + 1))
            c.type == 'File' && files.push(c);
        })
        .on('end', function() {
            files.forEach(function(file) {
                var backup = file.path + '.' + options.backup;
                FS.renameSync(file.path, backup);
                KrasotaAPI({
                    input: backup,
                    output: file.path,
                    beautifiers: options.beautifiers
                }).then(function(res) {
                    console.log('Krasota for %s', file.path);
                    console.log(res || '');
                });
            })
        });

};

};
