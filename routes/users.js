var express = require('express');
var router = express.Router();

var userService = require('../service/userService.js');
//得到用户文章用于个人主页展示
router.get('/:uid', function(req, res, next) {
	var uid=req.params.uid;
	if(!req.session.user){
		res.locals.user = "";
	}else{
		res.locals.user = req.session.user;
	}
	userService.getUserInfo(uid,function(err,userinfo){
		userService.getArticlesByUid(uid,function(err,articles){
			if(userinfo[0].tags!=null){
				var tagString=userinfo[0].tags.trim();
				if(tagString!=""){
					var tagsArray=tagString.split(",");
					userinfo[0].tags=tagsArray;
				}else{
					userinfo[0].tags=[];
				}
			}else{
				userinfo[0].tags=[];
			}
			if(articles.length==0||articles==null){
				res.render('main',{userinfo:userinfo[0],have:false});
			}else{
				res.render('main',{userinfo:userinfo[0],have:true,articles:articles});
			}
		});
	});
});

//得到基本的个人信息
router.get('/simpleInfo/:uid', function(req, res, next) {
	var uid=req.params.uid;
	userService.getUserInfo(uid,function(err,userinfo){
		if(userinfo[0].tags!=null){
				var tagString=userinfo[0].tags.trim();
				if(tagString!=""){
					var tagsArray=tagString.split(",");
					userinfo[0].tags=tagsArray;
				}else{
					userinfo[0].tags=[];
				}
			}else{
				userinfo[0].tags=[];
			}
		res.send(userinfo[0]);
	});
});

//用户个人中心
router.get('/center/:uid', function(req, res, next) {
	var uid=req.params.uid;
	if(!req.session.user){
		res.locals.user = "";
	}else{
		res.locals.user = req.session.user;
	}
	userService.getArticlesByUid(uid,function(err,result){
		if(result.length==0||result==null){
			res.render('home',{have:false});
		}else{
			res.render('home',{have:true,articles:result});
		}
	});
});
//得到用户博客
router.get('/:uid/articles', function(req, res, next) {
	var uid=req.params.uid;
	userService.getArticlesByUid(uid,function(err,result){
		if(result.length==0||result==null){
			res.send("没有哦");
		}else{
			res.send({articles:result});
		}
	});
});
//新增用户文章
router.post('/:uid/article', function(req, res, next) {
	var uid=req.params.uid;
	var content=req.body.content;
	userService.addArticle(uid,content,function(err,result){
		res.send(result);
	});
});

//得到某文章
router.get('/:uid/article/:pid', function(req, res, next) {
	var uid=req.params.uid;
	var pid=req.params.pid;
	userService.getArticleByUid(uid,pid,function(err,result){
		res.send(result);
	});
});

//更新文章
router.put('/:uid/article/:pid', function(req, res, next) {
	var uid=req.params.uid;
	var pid=req.params.pid;
	var content=req.body.content;
	userService.updateArticle(uid,pid,content,function(err,result){
		res.send(result);
	});
});
//删除文章
router.delete('/:uid/article/:pid', function(req, res, next) {
	var uid=req.params.uid;
	var pid=req.params.pid;
	userService.deleteArticle(uid,pid,function(err,result){
		res.send(result);
	});
});

//修改密码
router.post('/:uid/updatePassword', function(req, res, next) {
	var uid=req.params.uid;
	var prepassword=req.body.prepassword;
	var newpassword=req.body.newpassword;
	userService.updatePassword(uid,prepassword,newpassword,function(err,result){
		res.send(result);
	})
});
//修改个人信息
router.post('/:uid/updateInfo', function(req, res, next) {
	var uid=req.params.uid;
	var headurl=req.body.headurl;
	var mark=req.body.mark;
	var tags=req.body.tags;
	userService.updateInfo(uid,headurl,mark,tags,function(err,result){
		userService.getUserInfo(uid,function(err,userinfo){
			if(userinfo[0].tags!=null){
				var tagString=userinfo[0].tags.trim();
				if(tagString!=""){
					var tagsArray=tagString.split(",");
					userinfo[0].tags=tagsArray;
				}else{
					userinfo[0].tags=[];
				}
			}else{
				userinfo[0].tags=[];
			}
			req.session.user= userinfo[0];
			res.locals.user = userinfo[0];
			res.send(result);
		});
	});
});
module.exports = router;