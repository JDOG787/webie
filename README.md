# jolt
A lightweight http framework focused on simplicity.

## Usage 

```js
const jolt = reuqire("jolt");
const web = jolt(8080);

web.get("/", (req, res) => {
    res.send("hello world");
});
```
