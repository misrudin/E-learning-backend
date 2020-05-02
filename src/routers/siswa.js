const express = require("express");
const router = express.Router();

const siswaController = require("../controllers/siswa");
router.get("/", siswaController.getsiswa);
router.get("/detail", siswaController.getDetailSiswa);
router.post("/", siswaController.addsiswa);
router.patch("/", siswaController.updatesiswa);
router.patch("/edit", siswaController.editProfile);
router.delete("/", siswaController.deletesiswa);
module.exports = router;
