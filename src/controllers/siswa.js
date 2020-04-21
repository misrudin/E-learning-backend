const siswamodels = require("../models/siswa");
const helpers = require("../helpers/helpers");
const conn = require("../configs/db");
const bcrypt = require("bcryptjs");
module.exports = {
  getsiswa: (req, res) => {
    siswamodels
      .getsiswa()
      .then((result) => {
        helpers.response(res, result, 200);
      })
      .catch((err) => console.log(err));
  },
  addsiswa: (req, res) => {
    const { nis, id_kelas, nama, email, password } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        const data = {
          nis,
          id_kelas,
          nama,
          email,
          password: hash,
          rule: "siswa",
        };
        conn.query("select nis from siswa where nis=?", nis, (err, result) => {
          if (result.length > 0) {
            res.json("nis sudah terdaftar");
          } else {
            siswamodels
              .addsiswa(data)
              .then((result) => {
                const dataresponse = { id: result.insertId, ...data };
                helpers.response(res, dataresponse, 200);
              })
              .catch((err) => console.log(err));
          }
        });
      });
    });
  },
  deletesiswa: (req, res) => {
    const id = req.query.id;
    siswamodels
      .deletesiswa(id)
      .then((result) => {
        helpers.response(res, id, 200);
      })
      .catch((err) => console.log(err));
  },
  updatesiswa: (req, res) => {
    const id = req.query.id;
    const { nis, id_kelas, nama, email, password } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        const data = {
          nis,
          id_kelas,
          nama,
          email,
          password: hash,
        };
        conn.query(
          "select id,nis from siswa where nis=?",
          nis,
          (err, result) => {
            if (result.length > 0 && result[0].id != id) {
              res.json("nis sudah terdaftar");
            } else {
              siswamodels
                .updatesiswa(id, data)
                .then((result) => {
                  const dataresponse = { id, ...data };
                  helpers.response(res, dataresponse, 200);
                })
                .catch((err) => console.log(err));
            }
          }
        );
      });
    });
  },
};
