const express = require("express");
const Router = express.Router();

const guru = require("./guru");
Router.use("/guru", guru);

module.exports = Router;
