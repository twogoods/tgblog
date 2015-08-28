var dbutil = require('../db/mysql.js');

function mainService(){

}

mainService.getInfoForIndex = function(callback){
	dbutil.sendSql('select uid,name,headurl,mark from user order by id',[],function(err,result){
		callback(err,result);
	});
}

mainService.login = function(uid,password,callback){
	dbutil.sendSql('select uid,password,name,headurl,mark,tags from user where uid=?',[uid],function(err,result){
		if(err) callback(err,result);
		var res;
		if(result.length==0||result==null){
			res={success :false};
		}else if(result[0].password == password){
			var tagString=result[0].tags.trim();
			var tagsArray=tagString.split(",");
			res={success: true, uid:result[0].uid, name:result[0].name, headurl:result[0].headurl, mark:result[0].mark, tags : tagsArray};
		}else{
			res={success :false};
		}
		callback(err,res);
	});
}

module.exports = mainService;