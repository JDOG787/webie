const http = require("http");

module.exports = (port, options) => {
    let routes = [];
    let middlewares = [];

    const server = http.createServer((req, res) => {
        res.send = (data) => { res.write(data); res.end(); };


        const query = req.url.split("?")[1];
        const queryObj = {};
        if (query) {
            query.split("&").forEach(pair => {
                const [key, value] = pair.split("=");
                queryObj[key] = value;
            });
        }
        req.query = queryObj;

        req.url = req.url.split("?")[0];


        // middlewares
        middlewares.forEach(middleware => {
            middleware(req, res);
        });


        const route = routes.find((route) => route.path === req.url);
        if (route) {
            if (options && options.log === true) { console.log(`${req.method} ${req.url}`); }  
            if (route.middlewares) {
                route.middlewares.forEach(middleware => {
                    middleware(req, res);
                });
            }
            route.handler(req, res);
        } else {
            if (options && options.log === true) { console.log(`404 ${req.url}`); };

            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h1>404 This Page Doesn't Exist</h1>");
            res.end();
        }
    });

    server.listen(port);

    function get(path, ...handlers) {
        routes.push({
            path, 
            handler: handlers[handlers.length - 1], 
            middlewares: handlers.slice(0, -1)
        });
    }

    function middleware(handler) {
        middlewares.push(handler);
    }



    return { get, middleware }
}