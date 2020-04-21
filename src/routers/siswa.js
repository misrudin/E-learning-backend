const express = require("express");
const router = express.Router();

const siswaController = require("../controllers/siswa");
router.get("/", siswaController.getsiswa);
router.post("/", siswaController.addsiswa);
router.patch("/", siswaController.updatesiswa);
router.delete("/", siswaController.deletesiswa);
module.exports = router;
