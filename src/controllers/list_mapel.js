const mapelmodels = require("../models/list_mapel");
const helpers = require("../helpers/helpers");
const conn = require("../configs/db");


module.exports = {
  getmapel: (req, res) => {
    const {page, key} =req.query
    if(!page){
      mapelmodels
        .getmapel()
        .then((result) => {
          helpers.response(res, result, 200);
        })
        .catch((err) => console.log(err));
    }else if(key){
      conn.query("SELECT COUNT(*) as total FROM list_mapel where id_kelas like ?",'%' + parseInt(key) + '%', (err, result) => {
                const total = result[0].total;
                if(total >0){
                    if (page > 0) {
                        mapelmodels.pagination(key,page,total)
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
      conn.query("SELECT COUNT(*) as total FROM list_mapel", (err, result) => {
                const total = result[0].total;
                if(total >0){
                    if (page > 0) {
                        mapelmodels.pagination2(page,total)
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


  addmapel: (req, res) => {
    const { id_mapel,id_kelas,id_guru,type,description } = req.body;
    const data = {
      id_mapel,
      id_kelas,
      id_guru,
      type,
      file:process.env.URL_FILE + `uploads/${req.file.filename}`,
      description
    };
    mapelmodels
      .addmapel(data)
      .then((result) => {
        const dataresponse = { id:result.insertId,...data };
        helpers.response(res, dataresponse, 200);
      })
      .catch((err) => console.log(err));
  },
  deletemapel: (req, res) => {
    const id = req.query.id;
    mapelmodels
      .deletemapel(id)
      .then((result) => {
        helpers.response(res, id, 200);
      })
      .catch((err) => console.log(err));
  },
  updatemapel: (req, res) => {
    const id = req.query.id;
    const { id_mapel,id_kelas,id_guru,type,description } = req.body;
    const data = {
      id_mapel,
      id_kelas,
      id_guru,
      type,
      file:process.env.URL_FILE + `uploads/${req.file.filename}`,
      description
    };
    mapelmodels
      .updatemapel(id, data)
      .then((result) => {
        const dataresponse = { id, ...data };
        helpers.response(res, dataresponse, 200);
      })
      .catch((err) => console.log(err));
  },

  getDetailMapel:(req,res)=>{
    const {id, guru,kelas}=req.query
    if(id){
      mapelmodels.getById(id)
      .then((result)=>{
        helpers.response(res,result,200)
      })
      .catch(err=>{
        helpers.response(res,{},201,err)
      })
    }else if(guru){
      mapelmodels.getByIdGuru(guru)
      .then((result)=>{
        helpers.response(res,result,200)
      })
      .catch(err=>{
        helpers.response(res,{},201,err)
      })
    }else if(kelas){
      mapelmodels.getByIdKelas(kelas)
      .then((result)=>{
        helpers.response(res,result,200)
      })
      .catch(err=>{
        helpers.response(res,{},201,err)
      })
    }else{
      res.json({
        status:'reject',
        message:'Masukan parameter id, guru atau kelas!'
      })
    }

  },

};
