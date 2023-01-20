const http = require('http');
http.createServer(async (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8;',
        'Access-Control-Allow-Origin': '*'
    });
    res.write('Hello World!');
    res.end();
}).listen(8080);

