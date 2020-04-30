const conn=require('../configs/db')

module.exports={
	getAkses:(mapel)=>{
		return new Promise((resolve,reject)=>{
			conn.query("SELECT date_format(akses.time, '%d %M %Y %H:%i') as time_akses, siswa.nama as nama_siswa, mapel.nama_mapel,akses.count as count,date_format(akses.last_open, '%d %M %Y %H:%i') as last_akses FROM akses INNER JOIN siswa ON siswa.id=akses.id_siswa INNER JOIN list_mapel ON list_mapel.id=akses.id_mapel INNER JOIN mapel ON mapel.id = list_mapel.id_mapel WHERE list_mapel.id =? order by akses.last_open desc",mapel,(err,result)=>{
				if(!err){
					resolve(result)
				}else{
					reject(err)
				}
			})
		})
	},
	addAkses:(data)=>{
		return new Promise((resolve,reject)=>{
			conn.query("SELECT * from akses WHERE id_mapel = ? and	id_siswa = ?",[data.id_mapel,data.id_siswa],(err,res)=>{
				if(res.length > 0){
					conn.query("UPDATE akses SET count=count + 1 WHERE id = ?",res[0].id,(err,result)=>{
				if(!err){
					resolve(result)
				}else{
					reject(err)
				}
			})
				}else{
					conn.query("INSERT INTO akses SET ?",data,(err,result)=>{
				if(!err){
					resolve(result)
				}else{
					reject(err)
				}
			})
				}
			})
		})
	}
};