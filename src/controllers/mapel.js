const mapelmodels = require("../models/mapel");
const helpers = require("../helpers/helpers");
const conn = require("../configs/db");
module.exports = {
  getmapel: (req, res) => {
    mapelmodels
      .getmapel()
      .then((result) => {
        helpers.response(res, result, 200);
      })
      .catch((err) => console.log(err));
  },
  addmapel: (req, res) => {
    const { nama_mapel } = req.body;
    const data = {
      nama_mapel,
    };
    mapelmodels
      .addmapel(data)
      .then((result) => {
        const dataresponse = {id:result.insertId, ...data };
        helpers.response(res, dataresponse, 200);
      })
      .catch((err) => console.log(err));
  },
  deletemapel: (req, res) => {
    const id = req.query.id;
    mapelmodels
      .deletemapel(id)
      .then((result) => {
        helpers.response(res, id, 200);
      })
      .catch((err) => console.log(err));
  },
  updatemapel: (req, res) => {
    const id = req.query.id;
    const { nama_mapel } = req.body;
    const data = {
      nama_mapel,
    };
    mapelmodels
      .updatemapel(id, data)
      .then((result) => {
        const dataresponse = { id, ...data };
        helpers.response(res, dataresponse, 200);
      })
      .catch((err) => console.log(err));
  },
};
