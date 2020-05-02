const importExel = require("convert-excel-to-json");
const siswamodels = require("../models/siswa");
const helpers = require("../helpers/helpers");
const conn = require("../configs/db");
const bcrypt = require("bcryptjs");

const simpanData = (data) => {
  conn.query("select nis from siswa where nis=?", data.nis, (err, result) => {
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
};

module.exports = {
  importExcel: (req, res) => {
    let filename = req.file.filename;
    let siswa = [];
    let result = importExel({
      sourceFile: "./uploads/" + filename,
      header: { rows: 1 },
      columnTokey: {
        A: "nis",
        B: "id_kelas",
        C: "nama",
        D: "email",
        E: "password",
      },
      sheets: ["Sheet1"],
    });
    let i = 1;
    while (i <= result.Sheet1.length) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(result.Sheet1[i].E, salt, function (err, hash) {
          siswa.push({
            nis: result.Sheet1[i].A,
            id_kelas: result.Sheet1[i].B,
            nama: result.Sheet1[i].C,
            email: result.Sheet1[i].D,
            password: result.Sheet1[i].E,
          });

          const data = {
            nis: result.Sheet1[i].A,
            id_kelas: result.Sheet1[i].B,
            nama: result.Sheet1[i].C,
            email: result.Sheet1[i].D,
            password: hash,
          };
          console.log(data);
          i++;

          // conn.query("select nis from siswa where nis=?", data.nis, (err, result) => {
          //   if (result.length <= 0) {
          //     siswamodels
          //       .addsiswa(data)
          //       .then((result) => {
          //         const dataresponse = { id: result.insertId, ...data };
          //         helpers.response(res, dataresponse, 200);
          //       })
          //       .catch((err) => console.log(err));
          //   }
          // });
        });
      });
    }
    res.json("Selesai Import");
    // console.log(siswa + "jumlah data" + siswa.length);
  },
};
