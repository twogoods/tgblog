var mysql = require('mysql');
var pool  = mysql.createPool({
      //本地
  	  // connectionLimit : 10,
     //  host     : 'localhost',
     //  user     : 'root',
     //  password : '',
     //  database : 'class3'

      // coding
      connectionLimit : 40,
      host     : '10.9.1.188',
      user     : 'inPYcOlyfId0F1fN',
      password : 'DMA82pyOjUbXGdr3',
      database : 'cf_ff7f458e_1b2d_405b_a6a4_e2ab3549e9a4'
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