const conn = require("../configs/db");

module.exports = {
  getAbsen: (id) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT absen.id,absen.id_siswa,absen.id_kelas,siswa.nis,siswa.nama,kelas.nama_kelas as kelas,date_format(absen.tanggal, '%d') as tanggal,date_format(absen.tanggal, '%c') as bulan,date_format(absen.tanggal, '%Y') as tahun, absen.status FROM absen INNER JOIN siswa ON siswa.id=absen.id_siswa INNER JOIN kelas ON kelas.id=absen.id_kelas",
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

  paginationAbsen: (kelas,nomor, total) => {

        const dataPage = 10;// jumlah data per halaman

        const totalPage = total / dataPage; // mengitung jumlah halaman

        const firstData = (dataPage * nomor) - dataPage; // menentukan awal data tiap halaman


        return new Promise((resolve, reject) => {
            conn.query("SELECT absen.id,absen.id_siswa,absen.id_kelas,siswa.nis,siswa.nama,kelas.nama_kelas as kelas,date_format(absen.tanggal, '%d') as tanggal,date_format(absen.tanggal, '%c') as bulan,date_format(absen.tanggal, '%Y') as tahun, absen.status FROM absen INNER JOIN siswa ON siswa.id=absen.id_siswa INNER JOIN kelas ON kelas.id=absen.id_kelas where absen.id_kelas like ? LIMIT ?, ?", ['%' + kelas + '%',firstData, dataPage], (err, result) => {
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

    paginationAbsen2: (nomor, total) => {

        const dataPage = 10;// jumlah data per halaman

        const totalPage = total / dataPage; // mengitung jumlah halaman

        const firstData = (dataPage * nomor) - dataPage; // menentukan awal data tiap halaman


        return new Promise((resolve, reject) => {
            conn.query("SELECT absen.id,absen.id_siswa,absen.id_kelas,siswa.nis,siswa.nama,kelas.nama_kelas as kelas,date_format(absen.tanggal, '%d') as tanggal,date_format(absen.tanggal, '%c') as bulan,date_format(absen.tanggal, '%Y') as tahun, absen.status FROM absen INNER JOIN siswa ON siswa.id=absen.id_siswa INNER JOIN kelas ON kelas.id=absen.id_kelas LIMIT ?, ?", [firstData, dataPage], (err, result) => {
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


    // siswa
    getAbsen2: (id) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT siswa.nis,siswa.nama, absen2.* FROM siswa LEFT JOIN absen2 ON siswa.id=absen2.id_siswa",
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

  getsiswa: () => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT siswa.nis,siswa.nama,absen2.* FROM siswa LEFT JOIN absen2 ON siswa.id=absen2.id_siswa", (err, result) => {
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
            conn.query("SELECT siswa.nis,siswa.nama,absen2.* FROM siswa LEFT JOIN absen2 ON siswa.id=absen2.id_siswa where absen2.tahun=2020 and bulan=5 and siswa.nama like ? or siswa.nis like ? LIMIT ?, ?", ['%' + key + '%','%' + key + '%',firstData, dataPage], (err, result) => {
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
            conn.query("SELECT siswa.nis,siswa.nama,absen2.* FROM siswa LEFT JOIN absen2 ON siswa.id=absen2.id_siswa where absen2.tahun=2020 and bulan=5 order by siswa.nis asc LIMIT ?, ?", [firstData, dataPage], (err, result) => {
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

    pagination3: (kelas,nomor, total) => {

        const dataPage = 10;// jumlah data per halaman

        const totalPage = total / dataPage; // mengitung jumlah halaman

        const firstData = (dataPage * nomor) - dataPage; // menentukan awal data tiap halaman


        return new Promise((resolve, reject) => {
            conn.query("SELECT siswa.nis,siswa.nama,absen2.* FROM siswa LEFT JOIN absen2 ON siswa.id=absen2.id_siswa where absen2.tahun=2020 and bulan=5 and siswa.id_kelas =? LIMIT ?, ?", [kelas,firstData, dataPage], (err, result) => {
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

    pagination4: (kelas,key,nomor, total) => {

        const dataPage = 10;// jumlah data per halaman

        const totalPage = total / dataPage; // mengitung jumlah halaman

        const firstData = (dataPage * nomor) - dataPage; // menentukan awal data tiap halaman


        return new Promise((resolve, reject) => {
            conn.query("SELECT siswa.nis,siswa.nama,absen2.* FROM siswa LEFT JOIN absen2 ON siswa.id=absen2.id_siswa where absen2.tahun=2020 and bulan=5 and siswa.id_kelas=? and siswa.nama like ? or siswa.nis like ? LIMIT ?, ?", [kelas,'%' + key + '%','%' + key + '%',firstData, dataPage], (err, result) => {
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

  addAbsen2: (data) => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT id FROM absen2 where id_siswa = ? and tahun = ? and bulan=?",[data.id_siswa,data.tahun,data.bulan],(err,res)=>{
      if(res.length > 0){
        conn.query('update absen2 set ? where id= ?',[data,res[0].id],(err,result)=>{
          if (!err) {
          resolve(result);
        } else {
          reject(err);
        } 
        })
      }else{
        conn.query("INSERT INTO absen2 SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
      }
      })

      
    });
  },

};
