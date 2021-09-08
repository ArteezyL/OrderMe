var mysql  = require('mysql');  
 
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : 'arteezy',       
  port: '3306',                   
  database: 'dba' 
}); 
 
//connection.connect();
 
// var  sql = 'SELECT * FROM service';
// //查
// connection.query(sql,function (err, result) {
//         if(err){
//           console.log('[SELECT ERROR] - ',err.message);
//           return;
//         }
 
//        console.log('--------------------------SELECT----------------------------');
//        console.log(result);
//        console.log('------------------------------------------------------------\n\n');  
// });
 
 //connection.end();
module.exports = connection; 