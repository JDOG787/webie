# Webie
A lightweight http framework focused on simplicity.

## Usage 

```js
const webie = reuqire("webie");
const web = webie(8080);

web.get("/", (req, res) => {
    res.send("hello world");
});

web.get("/queries", (req, res) => {
    const query = req.query.test;
    res.send(query ? query : "Send a query");
});
```
