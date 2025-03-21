const express = require("express");
const averageRoute = require("./routes/averageRoute");

const app = express();
app.use(express.json());

app.use("/api", averageRoute);

module.exports = app;
