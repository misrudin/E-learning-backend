const express = require("express");
const router = express.Router();

const mapelController = require("../controllers/mapel");
router.get("/", mapelController.getmapel);
router.post("/", mapelController.addmapel);
router.patch("/", mapelController.updatemapel);
router.delete("/", mapelController.deletemapel);

module.exports = router;
