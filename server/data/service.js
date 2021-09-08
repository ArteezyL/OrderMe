/**
 * 初始化图书(book)模拟数据
 *
 * Created by jerry on 2017/11/13.
 */
const Db = require('../mysql.js');

  let Service = [];
  var sql = 'SELECT * FROM service';
  //查
  Db.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    result.forEach(function (v, index) {
      Service.push(
        {
          ser_id: v['user_id'],
          ser_name: v['user_name'],
          type: v['type'],
          p_id: v['p_id']
        }
      );
  
    });
    console.log(Service);
  
  });



module.exports = Service;
