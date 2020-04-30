const conn = require("../configs/db");
module.exports = {
  getsiswa: () => {
    return new Promise((resolve, reject) => {
      conn.query("select * from siswa", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  addsiswa: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("insert into siswa set ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  deletesiswa: (id) => {
    return new Promise((resolve, reject) => {
      conn.query("delete from siswa where id=?", id, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updatesiswa: (id, data) => {
    return new Promise((resolve, reject) => {
      conn.query(
        " update siswa set ? where id=?",
        [data, id],
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

  pagination: (key,nomor, total) => {

        const dataPage = 10;// jumlah data per halaman

        const totalPage = total / dataPage; // mengitung jumlah halaman

        const firstData = (dataPage * nomor) - dataPage; // menentukan awal data tiap halaman


        return new Promise((resolve, reject) => {
            conn.query("SELECT * FROM siswa where nama like ? or nis like ? LIMIT ?, ?", ['%' + key + '%','%' + key + '%',firstData, dataPage], (err, result) => {
                if (!err) {
                    const page = Math.ceil(totalPage);
                    let pages=[]
                    for (let i = 1; i <= page; i++) {
                      pages.push({page:i})
                    }
                    if (parseInt(nomor) <= page) {
                        resolve([page, parseInt(nomor), result,pages]);
                    }
                } else {
                    reject(new Error(err));
                }
            })
        })
    },

    pagination2: (nomor, total) => {

        const dataPage = 10;// jumlah data per halaman

        const totalPage = total / dataPage; // mengitung jumlah halaman

        const firstData = (dataPage * nomor) - dataPage; // menentukan awal data tiap halaman


        return new Promise((resolve, reject) => {
            conn.query("SELECT * FROM siswa LIMIT ?, ?", [firstData, dataPage], (err, result) => {
                if (!err) {
                    const page = Math.ceil(totalPage);
                    let pages=[]
                    for (let i = 1; i <= page; i++) {
                      pages.push({page:i})
                    }
                    if (parseInt(nomor) <= page) {
                        resolve([page, parseInt(nomor), result,pages]);
                    }
                } else {
                    reject(new Error(err));
                }
            })
        })
    },

  getDetailSiswa: (id) => {
    return new Promise((resolve, reject) => {
      conn.query("select * from siswa where id=?",id, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },

};
