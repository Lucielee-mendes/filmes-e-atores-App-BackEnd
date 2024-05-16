const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const path = require('path');
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use('/files',
    express.static(path.resolve(__dirname, 'uploads')));

app.get("/health", (req, res) => {
    return res.json("up")
});

app.listen(3333);
