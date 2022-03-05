# Webie
A lightweight http framework focused on simplicity.

## Usage 

```js
import webie from "webie";
const web = webie(8080);

// Not Complete(WIP) 
web.middleware((req, res) => {
    console.log(req)
});

web.get("/", (req, res) => {
    res.send("hello world");
});

web.get("/queries", (req, res) => {
    const query = req.query.test;
    res.send(query ? query : "Send a query");
});
```
