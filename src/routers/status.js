const express = require("express");
const Router = express.Router();

const statusController = require("../controllers/status");

// get data
Router.get("/", statusController.getStatus);

module.exports = Router;
