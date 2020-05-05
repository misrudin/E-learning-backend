const express = require("express");
const router = express.Router();
const multer = require('multer');

const importController = require("../controllers/importData");

const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + '-' + file.originalname)
    }
})


const upload = multer({storage: storage})


router.post("/",upload.single('file'), importController.importExcel);
router.post("/guru",upload.single('file'), importController.importGuru);

module.exports = router;
