const express = require("express");
const router = express.Router();

const absenController = require("../controllers/absen");

router.get("/", absenController.getAbsen);
router.post("/", absenController.addAbsen);

module.exports = router;
