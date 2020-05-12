const statusModel=require('../models/status')
const helper =require('../helpers/helpers')

module.exports={
	getStatus:(req,res)=>{
		const {tugas}=req.query
		statusModel.getStatus()
		.then(result=>{
			helper.response(res,result,200)
		})
		.catch(err=>helper.response(res,{},201,err))
	},
}