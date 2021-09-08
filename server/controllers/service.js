const Mock = require('mockjs');
//let Service = require('../data/service');
let serviceController = {};
let Service = [];
let _Service = [];
const Db = require('../mysql.js');
/**
 * 通过书名查询，获取图书列表
 * @param req
 * @param res
 */
serviceController.find = function (req, res) {
  let page = parseInt(req.query.page || 1); //页码（默认第1页）
  let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）
  let ser_name = decodeURI(req.query.ser_name) || ''; //图书名称
  console.log(ser_name)
  let total = 0;
  let rltService = [];
  Service = [];
  _Service = [];
  var sql = 'SELECT * FROM service';
  //查
  Db.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    result.forEach(function (v, index) {
      _Service.push(
        {
          ser_id: v['user_id'],
          ser_name: v['user_name'],
          type: v['type'],
          p_id: v['p_id']
        }
      );

    });
    Service = _Service
    console.log('更新')
    //console.log(_Service.pop())
    if (ser_name.length > 0) {
      let mockService = _Service.filter(service => {
        return service.ser_name.indexOf(ser_name) > -1;
      });
      total = mockService.length; //总条数
      rltService = mockService.filter((u, index) => index < limit * page && index >= limit * (page - 1))
    } else {
      total = _Service.length; //总条数
      rltService = _Service.filter((u, index) => index < limit * page && index >= limit * (page - 1))
    }
    res.json({
      total: total,
      limit: limit,
      service: rltService
    })
  });
};
/**
* 通过id获取某一条图书新
* @param req
* @param res
*/
serviceController.findById = function (req, res) {
  let id = _.trim(req.params.id || '');
  console.log(id)
  if (!id) {
    return res.json({ "errcode": 40002, "errmsg": "不合法的参数" });
  }
  let book = _.find(_Service, function (b) {
    return b.id === id;
  });
  res.json(book || null)
};

/**
 * 添加一条图书信息
 * @param req
 * @param res
 */
serviceController.create = function (req, res) {
  let ser_id = req.body.ser_id;
  let ser_name = req.body.ser_name;
  let type = req.body.type;
  let p_id = req.body.p_id;
  var sql = 'INSERT INTO service ( `user_id`,`user_name`, `type`, `p_id` )VALUES('+ ser_id + ',"' + ser_name + '","' + type + '",' + p_id + ')';
  console.log(sql)
  Db.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    

  });
  // Db.end();
  // _Service.push({
  //   id: Mock.Random.guid(),
  //   ser_id:ser_id,
  //   ser_name: ser_name,
  //   type: type,
  //   p_id: p_id
  // });
  res.json({ "errcode": 0, "errmsg": "新增成功" })
};

/***
 * 更新一条图书记录
 * @param req
 * @param res
 */
serviceController.update = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({ "errcode": 40002, "errmsg": "不合法的参数" });
  }
  let ser_id = req.body.ser_id;
  let ser_name = req.body.ser_name;
  let type = req.body.type;
  let p_id = req.body.p_id;
  var sql = 'UPDATE  service SET `user_name` ="'+ ser_name +'", `type` = "'+ type +'",  `p_id` = '+ p_id +' WHERE user_id = '+ser_id;
  console.log(sql)
  Db.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      res.json({ "errcode": 40009, "errmsg": "处理失败" });
    }
    else{
      res.json({ "errcode": 0, "errmsg": "修改成功" });
    }


  });
};

/**
 * 更新一条图书记录的部分信息
 * @param req
 * @param res
 */
serviceController.patch = function (req, res) {

};

/**
 * 批量删除
 * @param req
 * @param res
 */
serviceController.deleteBatch = function (req, res) {
  let ids = req.params.ids;
  ids = ids.split(',');
  _Service = _Service.filter(b => !ids.includes(b.id))
  res.json({ "errcode": 0, "errmsg": "删除成功" });
};

/**
 * 单条删除
 * @param req
 * @param res
 */
serviceController.delete = function (req, res) {
  let id = _.trim(req.params.id || '');
  console.log(req.params)
  if (!id) {
    return res.json({ "errcode": 40002, "errmsg": "不合法的参数" });
  }
  let i = _.findIndex(_Service, function (u) {
    return u.id === id
  })
  var sql = 'DELETE FROM service WHERE user_id = '+ id;
  console.log(sql)
  Db.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      res.json({ "errcode": 40009, "errmsg": "处理失败" });
    }
    else{
        res.json({ "errcode": 0, "errmsg": "修改成功" });
    }

  });
 
};

module.exports = serviceController;