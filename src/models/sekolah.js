const conn = require("../configs/db");
module.exports = {
  getsekolah: () => {
    return new Promise((resolve, reject) => {
      conn.query("select * from sekolah", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new err());
        }
      });
    });
  },
  addsekolah: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("insert into sekolah set ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updatesekolah: (npsn, data) => {
    return new Promise((resolve, reject) => {
      conn.query(
        " update sekolah set ? where npsn=?",
        [data, npsn],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },

  pagination: (key, nomor, total) => {
    const dataPage = 10; // jumlah data per halaman

    const totalPage = total / dataPage; // mengitung jumlah halaman

    const firstData = dataPage * nomor - dataPage; // menentukan awal data tiap halaman

    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT * FROM sekolah where nama_sekolah like ? LIMIT ?, ?",
        ["%" + key + "%", firstData, dataPage],
        (err, result) => {
          if (!err) {
            const page = Math.ceil(totalPage);
            let pages = [];
            for (let i = 1; i <= page; i++) {
              pages.push({ page: i });
            }
            if (parseInt(nomor) <= page) {
              resolve([page, parseInt(nomor), result, pages]);
            }
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },

  pagination2: (nomor, total) => {
    const dataPage = 10; // jumlah data per halaman

    const totalPage = total / dataPage; // mengitung jumlah halaman

    const firstData = dataPage * nomor - dataPage; // menentukan awal data tiap halaman

    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT * FROM sekolah LIMIT ?, ?",
        [firstData, dataPage],
        (err, result) => {
          if (!err) {
            const page = Math.ceil(totalPage);
            let pages = [];
            for (let i = 1; i <= page; i++) {
              pages.push({ page: i });
            }
            if (parseInt(nomor) <= page) {
              resolve([page, parseInt(nomor), result, pages]);
            }
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
};
