var mysql = require('mysql');
var pool  = mysql.createPool({
	connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'class3'
});


function dbutil(){

}

dbutil.sendSql=function(sql,params,callback){
  pool.query(sql, params,function(err, result) {
  if (err) {
    callback(err);
  }
  callback(err,result);
  });
};

module.exports = dbutil;





  // var id=1;
  // pool.query('SELECT * FROM user WHERE id = 1', [id],function(err,rows){
  //     console.log(rows);
  //     pool.end();
  // });

  // var post  = {loginid: '201203870302', name: '陈尧',password:'201203870302'};
  // pool.query('INSERT INTO user SET ?', post, function(err, result) {
  // 	if (err) throw err;
  //   console.log(result.insertId);
  //   pool.end();
  // });

  //与数据库相关的如列名用??   具体查询，插入的数据是?
  // var id = 1;
  // var columns = ['username', 'sex'];
  // pool.query('SELECT ?? FROM ?? WHERE id = ?', [columns, 'person', '2'], function(err, results) {
  //   console.log(results);
  //   pool.end();
  // });