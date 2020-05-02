const adminmodels = require("../models/admin");
const helpers = require("../helpers/helpers");
const conn = require("../configs/db");
const bcrypt = require("bcryptjs");
module.exports = {
  getadmin: (req, res) => {
    adminmodels
      .getadmin()
      .then((result) => {
        helpers.response(res, result, 200);
      })
      .catch((err) => console.log(err));
  },
  addadmin: (req, res) => {
    const { nama, email, password } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        const data = {
          nama,
          email,
          password: hash,
          rule: "admin",
        };
        conn.query(
          "select email from admin where email=?",
          email,
          (err, result) => {
            if (result.length > 0) {
              res.json("email sudah terdaftar");
            } else {
              adminmodels
                .addadmin(data)
                .then((result) => {
                  const dataresponse = { id: result.insertId, ...data };
                  helpers.response(res, dataresponse, 200);
                })
                .catch((err) => console.log(err));
            }
          }
        );
      });
    });
  },
  deleteadmin: (req, res) => {
    const id = req.query.id;
    adminmodels
      .deleteadmin(id)
      .then((result) => {
        helpers.response(res, id, 200);
      })
      .catch((err) => console.log(err));
  },
  updateadmin: (req, res) => {
    const id = req.query.id;
    const { nama, email, password } = req.body;
    if(password){
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
          const data = {
          nama,
          email,
          password: hash,
        }
        conn.query(
          "select id,email from admin where email=?",
          email,
          (err, result) => {
            if (result.length > 0 && result[0].id != id) {
              res.json("email sudah terdaftar");
            } else {
              adminmodels
                .updateadmin(id, data)
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
    }else{
          const data = {
          nama,
          email,
        };
        conn.query(
          "select id,email from admin where email=?",
          email,
          (err, result) => {
            if (result.length > 0 && result[0].id != id) {
              res.json("email sudah terdaftar");
            } else {
              adminmodels
                .updateadmin(id, data)
                .then((result) => {
                  const dataresponse = { id, ...data };
                  helpers.response(res, dataresponse, 200);
                })
                .catch((err) => console.log(err));
            }
          }
        );
    }
  },


  getDetailAdmin:(req,res)=>{
    const {id}=req.query

    adminmodels.getDetailAdmin(id)
    .then((result)=>{
      helpers.response(res,result,200)
    })
    .catch((err)=>{
      helpers.response(res,{},201,err)
    })
  },

};

