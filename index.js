var http = require('http');
var port = 3001;

http.createServer(function(req, res) {
    var userAgent = req.headers['user-agent'];
    var realIp = req.headers['x-real-ip'];

    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });

    if (userAgent.indexOf('curl') > -1) {
        res.write(realIp || req.connection.remoteAddress);
    } else {
        res.write('remoteAddress: ' + req.connection.remoteAddress + '\n');
        res.write('x-forwarded-for: ' + req.headers['x-forwarded-for'] + '\n');
        res.write('x-real-ip: ' + realIp + '\n');
    }

    res.end();
}).listen(port, '0.0.0.0', function() {
    console.log('listening on 0.0.0.0:' + port);
});