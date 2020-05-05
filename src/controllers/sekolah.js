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
    const { npsn, nama_sekolah, alamat } = req.body;
    const data = {
      npsn,
      nama_sekolah,
      alamat,
      logo:process.env.URL_FILE + `uploads/${req.file.filename}`,
    };
    sekolahmodels
      .addsekolah(data)
      .then((result) => {
        const dataresponse = { id:result.insertId,...data };
        helpers.response(res, dataresponse, 200);
      })
      .catch((err) => console.log(err));
  },
  updatesekolah: (req, res) => {
    const id = req.query.id;
    const { npsn,nama_sekolah, alamat } = req.body;
    if(req.file !== undefined){
    const data = {
      npsn,
      nama_sekolah,
      alamat,
      logo:process.env.URL_FILE + `uploads/${req.file.filename}`,
    };
    sekolahmodels
      .updatesekolah(id, data)
      .then((result) => {
        const dataresponse = { id, ...data };
        helpers.response(res, dataresponse, 200);
      })
      .catch((err) => console.log(err));
    }else{
      const data = {
      npsn,
      nama_sekolah,
      alamat,
    };
    sekolahmodels
      .updatesekolah(id, data)
      .then((result) => {
        const dataresponse = { id, ...data };
        helpers.response(res, dataresponse, 200);
      })
      .catch((err) => console.log(err));
    }
  },
};
