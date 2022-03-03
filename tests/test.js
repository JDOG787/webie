const server = require('../lib/index.js');
const web = server(8080, { log: true });

function test(req, res) {
    res.send('test');
}

web.get('/', test, (req, res) => {
    res.send(`<h1>root! ${req.query.test}</h1>`);
});

web.get('/hello', (req, res) => {
    res.write("<h1>Hello!</h1>");
    res.end();
});