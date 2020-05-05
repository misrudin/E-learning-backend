const absenModel = require("../models/absen");
const helpers = require("../helpers/helpers");

module.exports = {
  getAbsen: (req, res) => {
    const { id } = req.query;
    absenModel
      .getAbsen()
      .then((result) => {
        helpers.response(res, result, 200);
      })
      .catch((err) => {
        helpers.response(res, {}, 201, err);
      });
  },

  addAbsen: (req, res) => {
    const { id_kelas, id_siswa, status } = req.body;
    const data = {
      id_kelas,
      id_siswa,
      status,
    };
    absenModel
      .addAbsen(data)
      .then((result) => {
        const dataResponse = { id: result.insertId, ...data };
        helpers.response(res, dataResponse, 200);
      })
      .catch((err) => {
        helpers.response(res, {}, 201, err);
      });
  },
};
