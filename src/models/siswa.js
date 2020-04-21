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
};