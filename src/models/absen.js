const conn = require("../configs/db");

module.exports = {
  getAbsen: (id) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT absen.id,absen.id_siswa,absen.id_kelas,siswa.nama,kelas.nama_kelas as kelas,date_format(absen.tanggal, '%d') as tanggal,date_format(absen.tanggal, '%c') as bulan,date_format(absen.tanggal, '%Y') as tahun, absen.status FROM absen INNER JOIN siswa ON siswa.id=absen.id_siswa INNER JOIN kelas ON kelas.id=absen.id_kelas",
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  },
  addAbsen: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("INSERT INTO absen SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  },
};
