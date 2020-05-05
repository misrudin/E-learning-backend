const express = require("express");
const router = express.Router();
const multer = require('multer');

const sekolahController = require("../controllers/sekolah");

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


router.get("/", sekolahController.getsekolah);
router.post("/",upload.single('logo'), sekolahController.addsekolah);
router.patch("/",upload.single('logo'), sekolahController.updatesekolah);

module.exports = router;
