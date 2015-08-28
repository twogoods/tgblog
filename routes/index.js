var express = require('express');
var router = express.Router();

var mainService = require('../service/mainService.js');

/* GET home page. */
router.get('/', function(req, res, next) {

	mainService.getInfoForIndex(function(err,result){
		if(err) throw err;
		// session 文档  https://github.com/expressjs/session
		if(!req.session.user){
			res.locals.user = "";
		}else{
			res.locals.user = req.session.user;
		}
		res.render('index', { all: result});
	});
});


router.post('/login', function(req, res, next) {
	var uid=req.body.userid;
	var password=req.body.password;
	mainService.login(uid,password,function(err,result){
		var info = {success : false};
		if(result.success){
			req.session.user= result;
			res.locals.user = result;
		}
		res.send(result);		
	});
});

router.get('/logout', function(req, res, next) {
	req.session.destroy(function(err) {
  		
	});
	res.redirect('/');
});

module.exports = router;
