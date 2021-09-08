/**
 * 初始化图书(book)模拟数据
 *
 * Created by jerry on 2017/11/13.
 */
 const Db = require('../db.js');


 let Statistics = [];

 var  sql = 'SELECT * FROM statistics';
 //查
 Db.query(sql,function (err, result) {
         if(err){
           console.log('[SELECT ERROR] - ',err.message);
           return;
         }
        result.forEach(function(v,index){
         Statistics.push(
         {
           s_id:v['s_id'],
           s_name:v['s_name'],
           service_count:v['service_count'],
           orders_count:v['orders_count']
         }
       )
 
       });
      
 });



 
  module.exports = Statistics;
  

