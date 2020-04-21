const gurumodels = require("../models/guru");
const helpers = require("../helpers/helpers");
const conn = require("../configs/db");
module.exports = {
  getguru: (req, res) => {
    gurumodels
      .getguru()
      .then((result) => {
        helpers.response(res, result, 200);
      })
      .catch((err) => console.log(err));
  },
  addguru: (req, res) => {
    const { nip, nama_guru, email, password } = req.body;
    const data = {
      nip,
      nama_guru,
      email,
      password,
      rule: "guru",
    };
    conn.query("select nip from guru where nip=?", nip, (err, result) => {
      if (result.length > 0) {
        res.json("nip sudah terdaftar");
      } else {
        gurumodels
          .addguru(data)
          .then((result) => {
            const dataresponse = { id: result.insertId, ...data };
            helpers.response(res, dataresponse, 200);
          })
          .catch((err) => console.log(err));
      }
    });
  },
  deleteguru: (req, res) => {
    const id = req.query.id;
    gurumodels
      .deleteguru(id)
      .then((result) => {
        helpers.response(res, id, 200);
      })
      .catch((err) => console.log(err));
  },
  updateguru: (req, res) => {
    const id = req.query.id;
    const { nip, nama_guru, email, password } = req.body;
    const data = {
      nip,
      nama_guru,
      email,
      password,
    };
    gurumodels
      .updateguru(id, data)
      .then((result) => {
        const dataresponse = { id, ...data };
        helpers.response(res, dataresponse, 200);
      })
      .catch((err) => console.log(err));
  },
};
