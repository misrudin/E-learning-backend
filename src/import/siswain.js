let express = require("express");
let server = express();
let upload = require("express-fileupload");
let importExel = require("convert-excel-to-json");
let del = require("del");

server.use(upload());
/*server.get("/", (req, res) => {
  res.sendfile(__dirname + "/index.html");
});*/

server.post("/", (req, res) => {
  let file = req.file.filename;
  let filename = file.name;
  let siswa = [];
  file.mv("./excel/" + filename, (err) => {
    if (err) {
      res.send("maaf gagal upload");
    } else {
      let result = importExel({
        sourceFile: "./ecel/" + filename,
        header: { rows: 1 },
        columnTokey: {
          A: "nis",
          B: "id_kelas",
          C: "nama",
          D: "email",
          A: "password",
        },
        sheets: ["Sheet1"],
      });
      for (var i = 0; result.Sheet1.length > i; i++) {
        siswa.push(result.Sheet1[i].nama);
      }
      res.send(siswa);
      console.log(siswa + "jumlah data" + siswa.length);
      del(
        ["excel/" + filename].then((paths) => {
          console.log("sudah dihapus");
        })
      );
    }
  });
});
