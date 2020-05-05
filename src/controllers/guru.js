const gurumodels = require("../models/guru");
const helpers = require("../helpers/helpers");
const conn = require("../configs/db");
const bcrypt = require("bcryptjs");
module.exports = {
  getguru: (req, res) => {
    const {page, key} =req.query
    if(!page){
      gurumodels
        .getguru()
        .then((result) => {
          helpers.response(res, result, 200);
        })
        .catch((err) => console.log(err));
    }else if(key){
      conn.query("SELECT COUNT(*) as total FROM guru where nama_guru like ? or nip like ? ",['%' + key + '%','%' + key + '%'], (err, result) => {
                const total = result[0].total;
                if(total >0){
                    if (page > 0) {
                        gurumodels.pagination(key,page,total)
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
      conn.query("SELECT COUNT(*) as total FROM guru", (err, result) => {
                const total = result[0].total;
                if(total >0){
                    if (page > 0) {
                        gurumodels.pagination2(page,total)
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


  addguru: (req, res) => {
    const { nip, nama_guru, email, password } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password.toString(), salt, function (err, hash) {
        const data = {
          nip,
          nama_guru,
          email,
          password: hash,
          rule: "guru",
        };
        conn.query("select nip from guru where nip=?", nip, (err, result) => {
          if (result.length > 0) {
            const dataresponse = { id: result.insertId, ...data,status:0 };
            helpers.response(res, dataresponse, 200);
          } else {
            gurumodels
              .addguru(data)
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
  deleteguru: (req, res) => {
    const id = req.query.id;
    gurumodels
      .deleteguru(id)
      .then((result) => {
        helpers.response(res, id, 200);
      })
      .catch((err) => console.log(err));
  },
  updateguru: (req, res) => {
    const id = req.query.id;
    const { nip, nama_guru, email, password } = req.body;
        const data = {
          nip,
          nama_guru,
          email,
          password,
        };
        conn.query(
          "select id,nip from guru where nip=?",
          nip,
          (err, result) => {
            if (result.length > 0 && result[0].id != id) {
              res.json("nip sudah terdaftar");
            } else {
              gurumodels
                .updateguru(id, data)
                .then((result) => {
                  const dataresponse = { id, ...data };
                  helpers.response(res, dataresponse, 200);
                })
                .catch((err) => console.log(err));
            }
          }
        );
  },

  getDetailGuru:(req,res)=>{
    const {id}=req.query

    gurumodels.getDetailGuru(id)
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
          nama_guru:nama,
          email,
          password:hash,
        };
              gurumodels
                .updateguru(id, data)
                .then((result) => {
                  const dataresponse = { id, ...data };
                  helpers.response(res, dataresponse, 200);
                })
                .catch((err) => console.log(err));
      })
    })
    }else{
      const data = {
          nama_guru:nama,
          email,
        };
              gurumodels
                .updateguru(id, data)
                .then((result) => {
                  const dataresponse = { id, ...data };
                  helpers.response(res, dataresponse, 200);
                })
                .catch((err) => console.log(err));
    }
  }

};
