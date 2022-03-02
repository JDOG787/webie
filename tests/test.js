const server = require('../lib/index.js');
const web = server(8080, { log: true });


web.get('/', (req, res) => {
    res.send("<h1>root!</h1>");
    res.end();
});

web.get('/hello', (req, res) => {
    res.write("<h1>Hello!</h1>");
    res.end();
});