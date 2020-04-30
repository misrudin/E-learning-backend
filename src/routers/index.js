const express = require("express");
const Router = express.Router();

const auth = require("./auth");
Router.use("/auth", auth);

const guru = require("./guru");
Router.use("/guru", guru);

const siswa = require("./siswa");
Router.use("/siswa", siswa);

const admin = require("./admin");
Router.use("/admin", admin);

const kelas = require("./kelas");
Router.use("/kelas", kelas);

const mapel = require("./mapel");
Router.use("/mapel", mapel);

const listMapel = require("./list_mapel");
Router.use("/listmapel", listMapel);

const akses = require("./akses");
Router.use("/akses", akses);

module.exports = Router;
