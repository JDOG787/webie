# Webie
A lightweight http framework focused on simplicity.

## Usage 

```js
import webie from "webie";
const web = webie(8080);

// WIP 
web.middleware((req, res, next) => {
    console.log(req);
    next();
});

web.get("/", (req, res) => {
    res.send("hello world");
});

web.get("/json", (req, res) => {
    res.json({ msg: "hello world" });
});

web.get("/queries", (req, res) => {
    const query = req.query.test;
    res.send(query ? query : "Send a query");
});
```
