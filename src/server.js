const express = require("express");
const routes = require("./routes")
const app = express();

app.use(express.json());
app.use(routes);

app.use(
    express.urlencoded({
        extended: true
    })
)

app.get("/health", (req, res) => {
    return res.json("up")
});

app.listen(3333);
