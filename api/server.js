const express = require("express");
const apiRouter = require("./api-router");
const applyMiddleware = require("./api-middleware");

const app = express();

applyMiddleware(app);

app.use("/api", apiRouter);

module.exports = app;
