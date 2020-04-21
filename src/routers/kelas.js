const express = require("express");
const router = express.Router();

const kelasController = require("../controllers/kelas");
router.get("/", kelasController.getkelas);
router.post("/", kelasController.addkelas);
router.patch("/", kelasController.updatekelas);
router.delete("/", kelasController.deletekelas);
module.exports = router;
