const absenModel = require("../models/absen");
const helpers = require("../helpers/helpers");
const conn = require("../configs/db");


module.exports = {
  getAbsen: (req, res) => {
    const {page, kelas} =req.query
    if(!page){
      absenModel
        .getAbsen()
        .then((result) => {
          helpers.response(res, result, 200);
        })
        .catch((err) => console.log(err));
    }else if(kelas){
      conn.query("SELECT COUNT(*) as total FROM absen where id_kelas like ?",'%' + kelas + '%', (err, result) => {
                const total = result[0].total;
                if(total >0){
                    if (page > 0) {
                        absenModel.paginationAbsen(kelas,page,total)
                            .then((result) => {
                                helpers.response(res, result, 200)
                            })
                            .catch(err => console.log(err));
                    }
            }else{
                helpers.response(res, [1,"Curren Page: 1",[]], 200)
            }
        }); 
    }else{
      conn.query("SELECT COUNT(*) as total FROM absen", (err, result) => {
                const total = result[0].total;
                if(total >0){
                    if (page > 0) {
                        absenModel.paginationAbsen2(page,total)
                            .then((result) => {
                                helpers.response(res, result, 200)
                            })
                            .catch(err => helpers.response(res, {}, 201,err));
                    }
            }else{
                helpers.response(res, [1,"Curren Page: 1",[]], 200)
            }
        }); 
    }
  },

  addAbsen: (req, res) => {
    const { id_kelas, id_siswa, status } = req.body;
    const data = {
      id_kelas,
      id_siswa,
      status,
    };
    absenModel
      .addAbsen(data)
      .then((result) => {
        const dataResponse = { id: result.insertId, ...data };
        helpers.response(res, dataResponse, 200);
      })
      .catch((err) => {
        helpers.response(res, {}, 201, err);
      });
  },

  getAbsenSiswa: (req, res) => {
    const date=new Date()
    const tahun=date.getFullYear()
    const bulan=date.getMonth()+1
    const {page, key,kelas} =req.query
    if(!page){
      absenModel
        .getsiswa()
        .then((result) => {
          helpers.response(res, result, 200);
        })
        .catch((err) => console.log(err));
    }else if(kelas && key){
      console.log(kelas)
      conn.query("SELECT COUNT(*) as total FROM siswa where id_kelas = ? and nama like ? or nis like ?",[kelas,'%' + key + '%','%' + key + '%'], (err, result) => {
                const total = result[0].total;
                if(total >0){
                    if (page > 0) {
                        absenModel.pagination4(kelas,key,page,total)
                            .then((result) => {
                                helpers.response(res, result, 200)
                            })
                            .catch(err => console.log(err));
                    }
            }else{
                helpers.response(res, [1,"Curren Page: 1",[]], 200)
            }
        }); 
    }else if(kelas){
      console.log(kelas)
      conn.query("SELECT COUNT(*) as total FROM siswa where id_kelas = ?",kelas, (err, result) => {
                const total = result[0].total;
                if(total >0){
                    if (page > 0) {
                        absenModel.pagination3(kelas,page,total)
                            .then((result) => {
                                helpers.response(res, result, 200)
                            })
                            .catch(err => console.log(err));
                    }
            }else{
                helpers.response(res, [1,"Curren Page: 1",[]], 200)
            }
        }); 
    }else if(key){
      conn.query("SELECT COUNT(*) as total FROM siswa where nama like ? or nis like ?",['%' + key + '%','%' + key + '%'], (err, result) => {
                const total = result[0].total;
                if(total >0){
                    if (page > 0) {
                        absenModel.pagination(key,page,total)
                            .then((result) => {
                                helpers.response(res, result, 200)
                            })
                            .catch(err => console.log(err));
                    }
            }else{
                helpers.response(res, [1,"Curren Page: 1",[]], 200)
            }
        }); 
    }else{
      conn.query("SELECT COUNT(*) as total FROM siswa", (err, result) => {
                const total = result[0].total;
                if(total >0){
                    if (page > 0) {
                        absenModel.pagination2(page,total)
                            .then((result) => {
                                helpers.response(res, result, 200)
                            })
                            .catch(err => helpers.response(res, {}, 201,err));
                    }
            }else{
                helpers.response(res, [1,"Curren Page: 1",[]], 200)
            }
        }); 
    }
  },

  getAbsen2:(req,res)=>{
    absenModel.getAbsen2()
    .then(result=>helpers.response(res,result,200))
    .catch(err=>helpers.response(res,{},201,err))
  },

  addAbsen2: (req, res) => {
    const { id_siswa, tahun,bulan,tgl_1,tgl_2,tgl_3,tgl_4,tgl_5,tgl_6,tgl_7,tgl_8,tgl_9,tgl_10,tgl_11,tgl_12,tgl_13,tgl_14,tgl_15,tgl_16,tgl_17,tgl_18,tgl_19,tgl_20,tgl_21,tgl_22,tgl_23,tgl_24,tgl_25,tgl_26,tgl_27,tgl_28,tgl_29,tgl_30,tgl_31 } = req.body;
    // const data = {
    //   id_siswa,tahun,bulan,tgl_1,tgl_2,tgl_3,tgl_4,tgl_5,tgl_6,tgl_7,tgl_8,tgl_9,tgl_10,tgl_11,tgl_12,tgl_13,tgl_14,tgl_15,tgl_16,tgl_17,tgl_18,tgl_19,tgl_20,tgl_21,tgl_22,tgl_23,tgl_24,tgl_25,tgl_26,tgl_27,tgl_28,tgl_29,tgl_30,tgl_31
    // };
    let data ={}
    tgl_1 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_1
    }
    : tgl_2 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_2
    }
    : tgl_3 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_3
    }
    : tgl_4 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_4
    }
    : tgl_5 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_5
    }
    : tgl_6 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_6
    }
    : tgl_7 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_7
    }
    : tgl_8 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_8
    }
    : tgl_9 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_9
    }
    : tgl_10 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_10
    }
    : tgl_11 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_11
    }
    : tgl_12 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_12
    }
    : tgl_13 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_13
    }
    : tgl_14 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_14
    }
    : tgl_15 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_15
    }
    : tgl_16 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_16
    }
    : tgl_17 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_17
    }
    : tgl_18 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_18
    }
    : tgl_19 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_19
    }
    : tgl_20 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_20
    }
    : tgl_21 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_21
    }
    : tgl_22 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_22
    }
    : tgl_23 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_23
    }
    : tgl_24 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_24
    }
    : tgl_25 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_25
    }
    : tgl_26 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_26
    }
    : tgl_27 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_27
    }
    : tgl_28 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_28
    }
    : tgl_29 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_29
    }
    : tgl_30 !== undefined ? data = {
      id_siswa,tahun,bulan,tgl_30
    }: data = {
      id_siswa,tahun,bulan,tgl_31
    }
    console.log(data)
    absenModel
      .addAbsen2(data)
      .then((result) => {
        const dataResponse = { id: result.insertId, ...data };
        helpers.response(res, dataResponse, 200);
      })
      .catch((err) => {
        helpers.response(res, {}, 201, err);
      });
  },
};
