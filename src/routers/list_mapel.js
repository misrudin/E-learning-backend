const express = require("express");
const router = express.Router();
const multer = require('multer');

const mapelController = require("../controllers/list_mapel");

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


router.get("/", mapelController.getmapel);
router.get("/detail", mapelController.getDetailMapel);
router.post("/",upload.single('file'), mapelController.addmapel);
router.patch("/",upload.single('file'), mapelController.updatemapel);
router.delete("/", mapelController.deletemapel);

module.exports = router;
