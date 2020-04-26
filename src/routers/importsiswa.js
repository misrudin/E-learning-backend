const express = require("express");
const router = express.Router();

const siswainImport = require("../import/importsiswa");
router.post("/", siswainImport);

module.exports = router;
