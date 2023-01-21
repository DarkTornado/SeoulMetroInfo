const http = require('http');
const subway = require('./subway');

http.createServer(async (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8;',
        'Access-Control-Allow-Origin': '*'
    });
    var data = await subway.getRunningData(1);
    res.write(JSON.stringify(data, null, 4));
    res.end();
}).listen(8080);