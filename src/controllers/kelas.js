const kelasmodels = require("../models/kelas");
const helpers = require("../helpers/helpers");
const conn = require("../configs/db");
module.exports = {
  getkelas: (req, res) => {
    kelasmodels
      .getkelas()
      .then((result) => {
        helpers.response(res, result, 200);
      })
      .catch((err) => console.log(err));
  },
  addkelas: (req, res) => {
    const { nama_kelas } = req.body;
    const data = {
      nama_kelas,
    };
    kelasmodels
      .addkelas(data)
      .then((result) => {
        const dataresponse = { ...data };
        helpers.response(res, dataresponse, 200);
      })
      .catch((err) => console.log(err));
  },
  deletekelas: (req, res) => {
    const id = req.query.id;
    kelasmodels
      .deletekelas(id)
      .then((result) => {
        helpers.response(res, id, 200);
      })
      .catch((err) => console.log(err));
  },
  updatekelas: (req, res) => {
    const id = req.query.id;
    const { nama_kelas } = req.body;
    const data = {
      nama_kelas,
    };
    kelasmodels
      .updatekelas(id, data)
      .then((result) => {
        const dataresponse = { id, ...data };
        helpers.response(res, dataresponse, 200);
      })
      .catch((err) => console.log(err));
  },
};
