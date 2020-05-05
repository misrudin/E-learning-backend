const conn = require("../configs/db");

module.exports = {
  // get data
  getTugas: (status) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT tugas.id,tugas.description,tugas.batas_waktu,mapel.nama_mapel,kelas.nama_kelas,guru.nama_guru,tugas.status FROM tugas INNER JOIN kelas ON kelas.id=tugas.id_kelas INNER JOIN mapel ON mapel.id=tugas.id_mapel INNER JOIN guru ON guru.id=tugas.id_guru where tugas.status=?",
        status,
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
  getEsay: (id) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT esay.soal FROM esay WHERE esay.id_tugas=?",
        id,
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
  getJawaban: (id, siswa) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT esay.soal,jawab_esay.jawaban,siswa.nama FROM jawab_esay INNER JOIN esay ON esay.id=jawab_esay.id_detail_tugas INNER JOIN siswa ON siswa.id=jawab_esay.id_siswa WHERE esay.id_tugas=? and jawab_esay.id_siswa=?",
        [id, siswa],
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
  getPg: (id) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT pg.soal,pg.A,pg.B,pg.C,pg.D,pg.E,pg.benar FROM pg WHERE id_tugas=?",
        id,
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
  getPgJawaban: (id, siswa) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT pg.soal,pg.A,pg.B,pg.C,pg.D,pg.E,pg.benar,jawab_pg.jawaban,siswa.nama FROM pg INNER JOIN jawab_pg ON pg.id = jawab_pg.id_detail_tugas INNER JOIN siswa ON siswa.id = jawab_pg.id_siswa WHERE id_tugas=? and jawab_pg.id_siswa=?",
        [id, siswa],
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

  //   post data

  addTugas: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("INSERT INTO tugas SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  },
  addEsay: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("INSERT INTO esay SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  },
  addPg: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("INSERT INTO pg SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  },
  addEsayJawaban: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("INSERT INTO jawab_esay SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  },
  addPgJawaban: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("INSERT INTO jawab_pg SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  },

  //   edit data

  editTugas: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "UPDATE  tugas SET ? WHERE id= ?",
        [data, id],
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
  editEsay: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query("UPDATE esay SET ? WHERE id=?", [data, id], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  },
  editPg: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query("UPDATE pg SET ? WHERE id =?", [data, id], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  },

  //   edit data

  deleteTugas: (id) => {
    return new Promise((resolve, reject) => {
      conn.query("DELETE FROM tugas WHERE id= ?", id, (err, result) => {
        if (!err) {
          conn.query("delete from esay where id_tugas= ?", id);
          conn.query("delete from pg where id_tugas= ?", id);
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  },
  deleteEsay: (id) => {
    return new Promise((resolve, reject) => {
      conn.query("DELETE FORM esay WHERE id=?", id, (err, result) => {
        if (!err) {
          conn.query("DELETE FROM jawab_esay where id_detail_tugas= ?", id);
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  },
  deletePg: (id) => {
    return new Promise((resolve, reject) => {
      conn.query("DELETE pg WHERE id =?", id, (err, result) => {
        if (!err) {
          conn.query("DELETE FROM jawab_pg where id_detail_tugas= ?", id);
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  },
};
