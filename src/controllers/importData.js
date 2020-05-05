const importExel = require("convert-excel-to-json");
const helpers = require("../helpers/helpers");

module.exports = {
  importExcel: (req, res) => {
    let filename = req.file.filename;
    let siswa = [];
    let result = importExel({
      sourceFile: "./uploads/" + filename,
      header: { rows: 1 },
      columnTokey: {
        A: "nis",
        B: "nama",
        C: "email",
      },
      sheets: ["Sheet1"],
    });

    for( let i = 0; i < result.Sheet1.length; i++) {
          siswa.push({
            nis: result.Sheet1[i].A,
            nama: result.Sheet1[i].B,
            email: result.Sheet1[i].C,
          });
    }
    helpers.response(res,siswa,200)
  },

  importGuru: (req, res) => {
    let filename = req.file.filename;
    let guru = [];
    let result = importExel({
      sourceFile: "./uploads/" + filename,
      header: { rows: 1 },
      columnTokey: {
        A: "nip",
        B: "nama",
        C: "email",
      },
      sheets: ["Sheet1"],
    });

    for( let i = 0; i < result.Sheet1.length; i++) {
          guru.push({
            nip: result.Sheet1[i].A,
            nama: result.Sheet1[i].B,
            email: result.Sheet1[i].C,
          });
    }
    helpers.response(res,guru,200)
  },
};
