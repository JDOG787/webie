import { nextTick } from 'process';
import server from '../dist/index.js';
const web = server(8080, { showLogs: true });

web.middleware((req, res, next) => {
    // next();
})

web.middleware((req, res, next) => {
    console.log("ran");
    next();
})

web.get('/', (req, res) => {
    res.write("<h1>Hello!</h1>");
    res.end();
    // res.send(`<h1>root! ${req.query.test}</h1>`);
});

web.get('/hello', (req, res) => {
    res.write("<h1>Hello!</h1>");
    res.end();
});
