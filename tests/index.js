import { nextTick } from 'process';
import server from '../dist/index.js';
const web = server(8080, { showLogs: true });

web.middleware((req, res, next) => {
    console.log("ran");
    next();
})

web.get('/', (req, res) => {
    res.send(`<h1>Hello there, ${req.query.name}</h1>`);
});

web.get('/hello', (req, res) => {
    res.send("Hello Again World!");
});
