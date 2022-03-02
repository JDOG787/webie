const http = require("http");

module.exports = (port) => {
    let routes = [];

    const server = http.createServer((req, res) => {
        const route = routes.find((route) => route.path === req.url);
        if (route) {
            route.handler(req, res);
        } else {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h1>404</h1>");
            res.end();
        }
    });

    server.listen(port);

    function get(path, handler) {
        routes.push({path, handler});
    }

    return { get }
}