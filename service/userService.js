var dbutil = require('../db/mysql.js');
var tgutil = require('../util/tgutil.js');
var marked = require('marked');

function userService(){

}

userService.getUserInfo = function(uid,callback){
	dbutil.sendSql('select uid,name,headurl,mark,tags from user where uid =?',[uid],function(err,result){
		callback(err,result);
	});
}

userService.getArticlesByUid = function(uid,pageNo,callback){
	var pageSize=5;
	dbutil.sendSql('select count(*) as count from blogarticles where uid =?',[uid],function(err,num){
		var total=num[0].count;
		lastPage=parseInt((total-1)/pageSize)+1;
		if(pageNo>lastPage){
			pageNo=lastPage;
		}
		var offset=(pageNo-1)*pageSize;
		dbutil.sendSql('select * from blogarticles where uid =? order by time desc limit ?,5',[uid,offset],function(err,articles){
			articles.forEach(function(article){
				article.content=marked(article.content);
				article.time=tgutil.formatDate(article.time);
			});
			callback(err,articles,lastPage);
		});
	});
}

userService.getArticleByUid = function(uid,pid,callback){
	dbutil.sendSql('select * from blogarticles where uid =? and pid=?',[uid,pid],function(err,articles){
		callback(err,articles[0]);
	});
}

userService.addArticle = function(uid,content,callback){
	//coding默认时间为utc
	var now =new Date();
	now.setHours(now.getHours() + 8);
	var article  = {uid: uid, content: content,time :now };
	dbutil.sendSql('insert into blogarticles set ?',article,function(err,result){
		if(1==result.affectedRows){
			callback(err,{code:1});
		}else{
			callback(err,{code:0,msg:"文章添加出现异常"});
		}
	});
}

userService.updateArticle = function(uid,pid,content,callback){
	var article  = {content: content};
	dbutil.sendSql('update blogarticles set ? where pid=? and uid=?',[article,pid,uid],function(err,result){
		if(1==result.affectedRows){
			callback(err,{code:1});
		}else{
			callback(err,{code:0,msg:"文章更新出现异常"});
		}
	});
}

userService.deleteArticle = function(uid,pid,callback){
	dbutil.sendSql('delete from  blogarticles where pid=? and uid=?',[pid,uid],function(err,result){
		if(result.affectedRows==1){
			callback(err,{code:1});
		}else{
			callback(err,{code:0,msg:"文章删除出现异常"});
		}
	});
}

userService.updatePassword = function(uid,prepassword,newpassword,callback){
	dbutil.sendSql('select password from user where uid=?',[uid],function(err,passwords){
		if(prepassword==passwords[0].password){
			var password={password : newpassword}
			dbutil.sendSql('update user set ? where uid=?',[password,uid],function(err,result){
				callback(err,{code:1,msg:"修改成功"});
				// if(1==result.changedRows){
				// 	callback(err,{code:1,msg:"修改成功"});
				// }else{
				// 	callback(err,{code:0,msg:"修改密码功能出现异常"});
				// }
			});
		}else{
			callback(err,{code:0,msg:"原密码不正确"});
			
		}
	});
}

userService.updateInfo = function(uid,headurl,mark,tags,callback){
	var info={headurl : headurl , mark : mark , tags : tags};
	dbutil.sendSql('update user set ? where uid=?',[info,uid],function(err,result){
		callback(err,{code:1,msg:"修改成功"});
		//若参数与数据库里的一样，更新完changedRows为0
		// if(1==result.changedRows){
		// 	callback(err,{code:1,msg:"修改成功"});
		// }else{
		// 	callback(err,{code:0,msg:"修改出现异常"});
		// }
	});
}


module.exports = userService;