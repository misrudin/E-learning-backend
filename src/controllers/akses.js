const aksesModel=require('../models/akses')
const helper=require('../helpers/helpers')

module.exports={

	getAkses:(req,res)=>{
		const mapel=req.query.mapel
		aksesModel.getAkses(mapel)
		.then((result)=>{
			helper.response(res,result,200)
		})
		.catch((err)=>{
			helper.response(res,{},201,err)
		})
	},

	addAkses:(req,res)=>{
		const {id_siswa,id_mapel}=req.body
		const data={
			id_siswa,id_mapel,count:1
		}
		aksesModel.addAkses(data)
		.then((result)=>{
			const dataResponse={id:result.insertId,...data}
			helper.response(res,dataResponse,200)
		})
		.catch(err=>{
			helper.response(res,{},201,err)
		})
	}

}