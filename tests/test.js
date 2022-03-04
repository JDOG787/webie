import server from '../dist/index.js';
const web = server(8080, { showLogs: true });

function test(req, res) {
    res.write('Hello World');
    res.end();
}

web.get('/', test, (req, res) => {
    res.send(`<h1>root! ${req.query.test}</h1>`);
});

web.get('/hello', (req, res) => {
    res.write("<h1>Hello!</h1>");
    res.end();
});
