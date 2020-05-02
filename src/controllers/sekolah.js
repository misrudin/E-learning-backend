const sekolahmodels = require("../models/sekolah");
const helpers = require("../helpers/helpers");
const conn = require("../configs/db");
module.exports = {
  getsekolah: (req, res) => {
    sekolahmodels
      .getsekolah()
      .then((result) => {
        helpers.response(res, result, 200);
      })
      .catch((err) => console.log(err));
  },
  addsekolah: (req, res) => {
    const { npsn, nama_sekolah, alamat, logo } = req.body;
    const data = {
      npsn,
      nama_sekolah,
      alamat,
      logo,
    };
    sekolahmodels
      .addsekolah(data)
      .then((result) => {
        const dataresponse = { ...data };
        helpers.response(res, dataresponse, 200);
      })
      .catch((err) => console.log(err));
  },
  updatesekolah: (req, res) => {
    const npsn = req.query.npsn;
    const { nama_sekolah } = req.body;
    const data = {
      nama_sekolah,
    };
    sekolahmodels
      .updatesekolah(npsn, data)
      .then((result) => {
        const dataresponse = { npsn, ...data };
        helpers.response(res, dataresponse, 200);
      })
      .catch((err) => console.log(err));
  },
};
