const express = require("express");
const Router = express.Router();

const tugasController = require("../controllers/tugas");

// get data
Router.get("/", tugasController.getTugas);
Router.get("/type", tugasController.getTypeTugas);
Router.get("/esay", tugasController.getEsay);
Router.get("/pg", tugasController.getPg);
Router.get("/esay/jawab", tugasController.getJawaban);
Router.get("/pg/jawab", tugasController.getPgJawaban);

// post data

Router.post("/", tugasController.addTugas);
Router.post("/esay", tugasController.addEsay);
Router.post("/esay/jawab", tugasController.addEsayJawaban);
Router.post("/pg", tugasController.addPg);
Router.post("/pg/jawab", tugasController.addPgJawaban);

// patch data

Router.patch("/", tugasController.editTugas);
Router.patch("/esay", tugasController.editEsay);
Router.patch("/pg", tugasController.editPg);

// delete data

Router.delete("/", tugasController.deleteTugas);
Router.delete("/esay", tugasController.deleteEsay);
Router.delete("/pg", tugasController.deletePg);

module.exports = Router;
