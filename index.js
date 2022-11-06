const { request } = require("express");
const express = require("express");
const app = express();

app.use(function (req, res, next) {
    console.log('%s - %s ', req.method, req.url);
    next();
})

app.listen(3000, () => {
    console.log("Trabajo practico iniciado...");
});
