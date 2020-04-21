const express = require("express");
const auth = require("../helpers/auth");

const router = express.Router();
const controlerAuth = require("../controllers/auth");

router.post("/admin", controlerAuth.loginAdmin);

router.post("/siswa", controlerAuth.loginSiswa);

router.post("/guru", controlerAuth.loginGuru);

module.exports = router;
