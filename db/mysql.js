var mysql = require('mysql');
var pool  = mysql.createPool({
      //本地
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