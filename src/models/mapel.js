const conn = require("../configs/db");
module.exports = {
  getmapel: () => {
    return new Promise((resolve, reject) => {
      conn.query("select * from mapel", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new err());
        }
      });
    });
  },
  addmapel: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("insert into mapel set ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  deletemapel: (id) => {
    return new Promise((resolve, reject) => {
      conn.query("delete from mapel where id=?", id, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updatemapel: (id, data) => {
    return new Promise((resolve, reject) => {
      conn.query(
        " update mapel set ? where id=?",
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
            conn.query("SELECT * FROM mapel where nama_mapel like ? LIMIT ?, ?", ['%' + key + '%',firstData, dataPage], (err, result) => {
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
            conn.query("SELECT * FROM mapel LIMIT ?, ?", [firstData, dataPage], (err, result) => {
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

};
