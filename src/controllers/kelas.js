const kelasmodels = require("../models/kelas");
const helpers = require("../helpers/helpers");
const conn = require("../configs/db");
module.exports = {
  getkelas: (req, res) => {
    const {page, key} =req.query
    if(!page){
      kelasmodels
        .getkelas()
        .then((result) => {
          helpers.response(res, result, 200);
        })
        .catch((err) => console.log(err));
    }else if(key){
      conn.query("SELECT COUNT(*) as total FROM kelas where nama_kelas like ?",'%' + key + '%', (err, result) => {
                const total = result[0].total;
                if(total >0){
                    if (page > 0) {
                        kelasmodels.pagination(key,page,total)
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
      conn.query("SELECT COUNT(*) as total FROM kelas", (err, result) => {
                const total = result[0].total;
                if(total >0){
                    if (page > 0) {
                        kelasmodels.pagination2(page,total)
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


  addkelas: (req, res) => {
    const { nama_kelas } = req.body;
    const data = {
      nama_kelas,
    };
    kelasmodels
      .addkelas(data)
      .then((result) => {
        const dataresponse = { id:result.insertId,...data };
        helpers.response(res, dataresponse, 200);
      })
      .catch((err) => console.log(err));
  },
  deletekelas: (req, res) => {
    const id = req.query.id;
    kelasmodels
      .deletekelas(id)
      .then((result) => {
        helpers.response(res, id, 200);
      })
      .catch((err) => console.log(err));
  },
  updatekelas: (req, res) => {
    const id = req.query.id;
    const { nama_kelas } = req.body;
    const data = {
      nama_kelas,
    };
    kelasmodels
      .updatekelas(id, data)
      .then((result) => {
        const dataresponse = { id, ...data };
        helpers.response(res, dataresponse, 200);
      })
      .catch((err) => console.log(err));
  },
};
