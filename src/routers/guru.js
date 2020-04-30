const express = require("express");
const router = express.Router();

const guruController = require("../controllers/guru");

router.get("/", guruController.getguru);
router.get("/detail", guruController.getDetailGuru);
router.post("/", guruController.addguru);
router.patch("/", guruController.updateguru);
router.delete("/", guruController.deleteguru);
module.exports = router;
