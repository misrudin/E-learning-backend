const express = require("express");
const router = express.Router();

const aksesController = require("../controllers/akses");


router.get("/", aksesController.getAkses);
router.post("/", aksesController.addAkses);
// router.patch("/", aksesController.updateAkses);
// router.delete("/", aksesController.deleteAkses);

module.exports = router;
