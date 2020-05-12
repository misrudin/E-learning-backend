const conn =require('../configs/db')

module.exports={
	getStatus:()=>{
		return new Promise((resolve,resject)=>{
			conn.query("select * from tugas_status",(err,result)=>{
				if(!err){
					resolve(result)
				}else{
					resject(err)
				}
			})
		})
	}
}