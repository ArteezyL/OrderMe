const Mock = require('mockjs');
//const Statistics = require('../data/statistics');
let statisticsController = {};
let Statistics=[];
let _Statistics = [];


const Db = require('../mysql.js');

/**
 * 通过书名查询，获取图书列表
 * @param req
 * @param res
 */
 statisticsController.find = function (req, res) {
  let page = parseInt(req.query.page || 1); //页码（默认第1页）
  let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）
  let s_name = decodeURI(req.query.s_name) || ''; //图书名称
  console.log(s_name)
  let total = 0;
  let rltStatistics = []; 
  Statistics = [];
  _Statistics = [];
  var sql = 'SELECT * FROM statistics';
  //查
  Db.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    result.forEach(function (v, index) {
      _Statistics.push(
        {
          s_id: v['s_id'],
          s_name: v['s_name'],
          service_count: v['service_count'],
          orders_count: v['orders_count']
        }
      );

    });
    Statistics = _Statistics
    console.log('更新')
    //console.log(_Service.pop())
    if (s_name.length > 0) {
      let mockStatistics = _Statistics.filter(statistics => {
        return statistics.s_name.indexOf(s_name) > -1;
      });
      total = mockStatistics.length; //总条数
      rltStatistics = mockStatistics.filter((u, index) => index < limit * page && index >= limit * (page - 1))
    } else {
      total = _Statistics.length; //总条数
      rltStatistics = _Statistics.filter((u, index) => index < limit * page && index >= limit * (page - 1))
    }
    res.json({
      total: total,
      limit: limit,
      statistics: rltStatistics
    })
  });
};
 /*statisticsController.find = function (req, res) {
    let page = parseInt(req.query.page || 1); //页码（默认第1页）
    let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）
    let s_name = decodeURI(req.query.s_name) || ''; //图书名称
    console.log(s_name)
  let total = 0;
  let rltStatistics = [];
  Statistics = [];
  _Statistics = [];
  var sql = 'SELECT * FROM statistics';
  //查
  Db.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    result.forEach(function (v, index) {
      _Statistics.push(
        {
          s_id: v['s_id'],
          s_name: v['s_name'],
          service_count: v['service_count'],
          orders_count: v['orders_count']
        }
      );
    });
    Statistics = _Statistics
    console.log('更新')


    if (s_name.length > 0) {
      let mockStatistics = _Statistics.filter(statistics => {
        return statistics.s_name.indexOf(s_name) > -1;
      });
      total = mockStatistics.length; //总条数
      rltStatistics = mockStatistics.filter((u, index) => index < limit * page && index >= limit * (page - 1))
    } else {
      total = _Statistics.length; //总条数
      rltStatistics = _Statistics.filter((u, index) => index < limit * page && index >= limit * (page - 1))
    }
    res.json({
      total: total,
      limit: limit,
      statistics: rltStatistics
    })
  };*/
  /**
 * 通过id获取某一条图书新
 * @param req
 * @param res
 */
   statisticsController.findById = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let book = _.find(_Statistics, function (b) {
    return b.id === id;
  });
  res.json(book || null)
};

/**
 * 添加一条图书信息
 * @param req
 * @param res
 */
 statisticsController.create = function (req, res) {
  let s_id = req.body.s_id;
  let s_name = req.body.s_name;
  let service_count = req.body.service_count;
  let orders_count = req.body.orders_count;

  _Statistics.push({
    id: Mock.Random.guid(),
    s_id:s_id,
    s_name: s_name,
    service_count: service_count,
    orders_count: orders_count
  });
  res.json({"errcode": 0, "errmsg": "新增成功"})
};
/***
 * 更新一条图书记录
 * @param req
 * @param res
 */
 statisticsController.update = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({ "errcode": 40002, "errmsg": "不合法的参数" });
  }
  let s_id = req.body.ser_id;
  let s_name = req.body.ser_name;
  let service_count = req.body.type;
  let orders_count = req.body.p_id;
  var sql = 'UPDATE  statistics SET `s_name` ="'+ s_name +'", `service_count` = "'+ service_count +'",  `orders_count` = '+ orders_count +' WHERE s_id = '+s_id;
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
 statisticsController.patch = function (req, res) {

};

/**
 * 批量删除
 * @param req
 * @param res
 */
 statisticsController.deleteBatch = function (req, res) {
  let ids = req.params.ids;
  ids = ids.split(',');

  
  
  _Statistics = _Statistics.filter(b => !ids.includes(b.id))
  res.json({"errcode": 0, "errmsg": "删除成功"});
};

/**
 * 单条删除
 * @param req
 * @param res
 */
 statisticsController.delete = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let i = _.findIndex(_Statistics, function (u) {
    return u.id === id
  })
  if (i > -1) {
    _Statistics.splice(i, 1);
    res.json({"errcode": 0, "errmsg": "修改成功"});
  } else {
    res.json({"errcode": 40009, "errmsg": "处理失败"});
  }
};

  module.exports = statisticsController;