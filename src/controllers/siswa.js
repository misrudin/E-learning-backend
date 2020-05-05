const siswamodels = require("../models/siswa");
const helpers = require("../helpers/helpers");
const conn = require("../configs/db");
const bcrypt = require("bcryptjs");
module.exports = {
  getsiswa: (req, res) => {
    const {page, key,kelas} =req.query
    if(!page){
      siswamodels
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
                        siswamodels.pagination4(kelas,key,page,total)
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
                        siswamodels.pagination3(kelas,page,total)
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
                        siswamodels.pagination(key,page,total)
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
                        siswamodels.pagination2(page,total)
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


  addsiswa: (req, res) => {
    const { nis, id_kelas, nama, email, password } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password.toString(), salt, function (err, hash) {
        const data = {
          nis,
          id_kelas,
          nama,
          email,
          password: hash,
          rule: "siswa",
        };
        conn.query("select nis from siswa where nis=?", nis, (err, result) => {
          if (result.length > 0) {
            // res.json("nis sudah terdaftar");
            const dataresponse = { id: result.insertId, ...data,status:0 };
            helpers.response(res, dataresponse, 200);
          } else {
            siswamodels
              .addsiswa(data)
              .then((result) => {
                const dataresponse = { id: result.insertId, ...data,status:1 };
                helpers.response(res, dataresponse, 200);
              })
              .catch((err) => console.log(err));
          }
        });
      });
    });
  },
  deletesiswa: (req, res) => {
    const id = req.query.id;
    siswamodels
      .deletesiswa(id)
      .then((result) => {
        helpers.response(res, id, 200);
      })
      .catch((err) => console.log(err));
  },
  updatesiswa: (req, res) => {
    const id = req.query.id;
    const { nis, id_kelas, nama, email, password } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        const data = {
          nis,
          id_kelas,
          nama,
          email,
          password: hash,
        };
        conn.query(
          "select id,nis from siswa where nis=?",
          nis,
          (err, result) => {
            if (result.length > 0 && result[0].id != id) {
              res.json("nis sudah terdaftar");
            } else {
              siswamodels
                .updatesiswa(id, data)
                .then((result) => {
                  const dataresponse = { id, ...data };
                  helpers.response(res, dataresponse, 200);
                })
                .catch((err) => console.log(err));
            }
          }
        );
      });
    });
  },

  getDetailSiswa:(req,res)=>{
    const {id}=req.query

    siswamodels.getDetailSiswa(id)
    .then((result)=>{
      helpers.response(res,result,200)
    })
    .catch((err)=>{
      helpers.response(res,{},201,err)
    })
  },

  editProfile: (req, res) => {
    const id = req.query.id;
    const { nama, email, password } = req.body;
    if(password){
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        const data = {
          nama,
          email,
          password:hash,
        };
              siswamodels
                .updatesiswa(id, data)
                .then((result) => {
                  const dataresponse = { id, ...data };
                  helpers.response(res, dataresponse, 200);
                })
                .catch((err) => console.log(err));
      })
    })
    }else{
      const data = {
          nama,
          email,
        };
              siswamodels
                .updatesiswa(id, data)
                .then((result) => {
                  const dataresponse = { id, ...data };
                  helpers.response(res, dataresponse, 200);
                })
                .catch((err) => console.log(err));
    }
  }
};
