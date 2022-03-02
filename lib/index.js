const http = require("http");

module.exports = (port, options) => {
    let routes = [];

    const server = http.createServer((req, res) => {
        res.send = (data) => { res.write(data); res.end(); };


        const route = routes.find((route) => route.path === req.url);
        if (route) {
            if (options && options.log === true) { console.log(`${req.method} ${req.url}`); }            
            route.handler(req, res);
        } else {
            if (options && options.log === true) { console.log(`404 ${req.url}`); };

            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h1>404 This Page Doesn't Exist</h1>");
            res.end();
        }
    });

    server.listen(port);

    function get(path, handler) {
        routes.push({path, handler});
    }

    return { get }
}