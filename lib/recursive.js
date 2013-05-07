module.exports = function(KrasotaAPI) {

var Ignore = require('fstream-ignore'),
    KrasotaAPI = KrasotaAPI.api;

return function(options, args) {

    Ignore({ path: args.directory, ignoreFiles: ['.krasotaignore', '.gitignore1'] })
        .on('child', function (c) {
            console.error(c.path.substr(c.root.path.length + 1))
            if(c.type == 'File') {
                console.log('Krasota for %s', c.path);
                KrasotaAPI({
                    input: c.path,
                    output: process.stdout,
                    beautifiers: options.beautifiers
                }).then(function(res) {
                    console.log(res || '');
                });
            }

        })

};

};
