const conn = require("../configs/db");
module.exports = {
  getguru: () => {
    return new Promise((resolve, reject) => {
      conn.query("select * from guru", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  addguru: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("insert into guru set ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  deleteguru: (id) => {
    return new Promise((resolve, reject) => {
      conn.query("delete from guru where id=?", id, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updateguru: (id, data) => {
    return new Promise((resolve, reject) => {
      conn.query(" update guru set ? where id=?", [data, id], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },

  pagination: (key,nomor, total) => {

        const dataPage = 10;// jumlah data per halaman

        const totalPage = total / dataPage; // mengitung jumlah halaman

        const firstData = (dataPage * nomor) - dataPage; // menentukan awal data tiap halaman


        return new Promise((resolve, reject) => {
            conn.query("SELECT * FROM guru where nama_guru like ? or nip like ? LIMIT ?, ?", ['%' + key + '%','%' + key + '%',firstData, dataPage], (err, result) => {
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
            conn.query("SELECT * FROM guru LIMIT ?, ?", [firstData, dataPage], (err, result) => {
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

  getDetailGuru: (id) => {
    return new Promise((resolve, reject) => {
      conn.query("select * from guru where id=?",id, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },

};
