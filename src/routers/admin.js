const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");
router.get("/", adminController.getadmin);
router.get("/detail", adminController.getDetailAdmin);
router.post("/", adminController.addadmin);
router.patch("/", adminController.updateadmin);
router.delete("/", adminController.deleteadmin);
module.exports = router;
