const express = require("express");
const router = express.Router();

const absenController = require("../controllers/absen");

router.get("/", absenController.getAbsen);
router.get("/siswa", absenController.getAbsenSiswa);
router.post("/", absenController.addAbsen);

router.get("/absen2", absenController.getAbsen2);
router.post("/absen2", absenController.addAbsen2);

module.exports = router;
