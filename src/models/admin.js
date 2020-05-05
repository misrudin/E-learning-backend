const conn = require("../configs/db");
module.exports = {
  getadmin: () => {
    return new Promise((resolve, reject) => {
      conn.query("select * from admin", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  addadmin: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("insert into admin set ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  deleteadmin: (id) => {
    return new Promise((resolve, reject) => {
      conn.query("delete from admin where id=?", id, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updateadmin: (id, data) => {
    return new Promise((resolve, reject) => {
      conn.query(
        " update admin set ? where id=?",
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

  getDetailAdmin: (id) => {
    return new Promise((resolve, reject) => {
      conn.query("select * from admin where id=?",id, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },


  pagination: (key,nomor, total) => {

        const dataPage = 5;// jumlah data per halaman

        const totalPage = total / dataPage; // mengitung jumlah halaman

        const firstData = (dataPage * nomor) - dataPage; // menentukan awal data tiap halaman


        return new Promise((resolve, reject) => {
            conn.query("SELECT * FROM admin where nama like ? LIMIT ?, ?", ['%' + key + '%',firstData, dataPage], (err, result) => {
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

        const dataPage = 5;// jumlah data per halaman

        const totalPage = total / dataPage; // mengitung jumlah halaman

        const firstData = (dataPage * nomor) - dataPage; // menentukan awal data tiap halaman


        return new Promise((resolve, reject) => {
            conn.query("SELECT * FROM admin LIMIT ?, ?", [firstData, dataPage], (err, result) => {
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
