const express = require("express");
const router = express.Router();

const sekolahController = require("../controllers/sekolah");
router.get("/", sekolahController.getsekolah);
router.post("/", sekolahController.addsekolah);
router.patch("/", sekolahController.updatesekolah);

module.exports = router;
