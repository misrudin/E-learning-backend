const conn = require("../configs/db");
    const date = new Date();
    const sekarang=date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
module.exports = {
  getmapel: () => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT list_mapel.*,mapel.nama_mapel,kelas.nama_kelas,guru.nama_guru,list_mapel.type,list_mapel.file,list_mapel.description,date_format(list_mapel.create,'%d %M %Y %H:%i') as time_create FROM list_mapel INNER JOIN mapel ON mapel.id = list_mapel.id_mapel INNER JOIN kelas on kelas.id=list_mapel.id_kelas INNER JOIN guru on guru.id=list_mapel.id_guru ORDER BY list_mapel.create DESC", (err, result) => {
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
      conn.query("insert into list_mapel set ?", data, (err, result) => {
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
      conn.query("delete from list_mapel where id=?", id, (err, result) => {
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
        " update list_mapel set ? where id=?",
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

        const dataPage = 12;// jumlah data per halaman

        const totalPage = total / dataPage; // mengitung jumlah halaman

        const firstData = (dataPage * nomor) - dataPage; // menentukan awal data tiap halaman


        return new Promise((resolve, reject) => {
            conn.query("SELECT list_mapel.*,mapel.nama_mapel,kelas.nama_kelas,guru.nama_guru,list_mapel.type,list_mapel.file,list_mapel.description,date_format(list_mapel.create,'%d %M %Y %H:%i') as time_create FROM list_mapel INNER JOIN mapel ON mapel.id = list_mapel.id_mapel INNER JOIN kelas on kelas.id=list_mapel.id_kelas INNER JOIN guru on guru.id=list_mapel.id_guru where list_mapel.id_kelas like ? ORDER BY list_mapel.create DESC LIMIT ?, ?", ['%' + key + '%',firstData, dataPage], (err, result) => {
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

        const dataPage = 12;// jumlah data per halaman

        const totalPage = total / dataPage; // mengitung jumlah halaman

        const firstData = (dataPage * nomor) - dataPage; // menentukan awal data tiap halaman


        return new Promise((resolve, reject) => {
            conn.query("SELECT list_mapel.*,mapel.nama_mapel,kelas.nama_kelas,guru.nama_guru,list_mapel.type,list_mapel.file,list_mapel.description,date_format(list_mapel.create,'%d %M %Y %H:%i') as time_create FROM list_mapel INNER JOIN mapel ON mapel.id = list_mapel.id_mapel INNER JOIN kelas on kelas.id=list_mapel.id_kelas INNER JOIN guru on guru.id=list_mapel.id_guru ORDER BY list_mapel.create DESC LIMIT ?, ?", [firstData, dataPage], (err, result) => {
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

    getById: (id) => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT list_mapel.id,mapel.nama_mapel,kelas.nama_kelas,guru.nama_guru,list_mapel.type,list_mapel.file,list_mapel.description,date_format(list_mapel.create,'%d %M %Y %H:%i') as time_create FROM list_mapel INNER JOIN mapel ON mapel.id = list_mapel.id_mapel INNER JOIN kelas on kelas.id=list_mapel.id_kelas INNER JOIN guru on guru.id=list_mapel.id_guru where list_mapel.id =? ORDER BY list_mapel.create DESC",id, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new err());
        }
      });
    });
  },

  getByIdGuru: (guru) => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT list_mapel.id,mapel.nama_mapel,kelas.nama_kelas,guru.nama_guru,list_mapel.type,list_mapel.file,list_mapel.description,date_format(list_mapel.create,'%d %M %Y %H:%i') as time_create FROM list_mapel INNER JOIN mapel ON mapel.id = list_mapel.id_mapel INNER JOIN kelas on kelas.id=list_mapel.id_kelas INNER JOIN guru on guru.id=list_mapel.id_guru where list_mapel.id_guru =? and list_mapel.create >= ? ORDER BY list_mapel.create DESC",[guru,sekarang], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new err());
        }
      });
    });
  },

  getByIdKelas: (kelas) => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT list_mapel.id,mapel.nama_mapel,kelas.nama_kelas,guru.nama_guru,list_mapel.type,list_mapel.file,list_mapel.description,date_format(list_mapel.create,'%d %M %Y %H:%i') as time_create FROM list_mapel INNER JOIN mapel ON mapel.id = list_mapel.id_mapel INNER JOIN kelas on kelas.id=list_mapel.id_kelas INNER JOIN guru on guru.id=list_mapel.id_guru where list_mapel.id_kelas =? and list_mapel.create >= ? ORDER BY list_mapel.create DESC",[kelas,sekarang], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new err());
        }
      });
    });
  },

};
