var express = require('express');
var router = express.Router();
var indexRouter = {};

var statisticsController = require('../../../controllers/statistics');


//返回book的集合
router.get('/', statisticsController.find);

//返回指定的book
router.get('/:id', statisticsController.findById);

//创建book
router.post('/', statisticsController.create);

//更新book全部信息
router.put('/:id', statisticsController.update);

//更新book部分信息
router.patch('/:id', statisticsController.patch);

//批量删除
router.delete('/batch/:ids', statisticsController.deleteBatch);

//删除指定的book
router.delete('/:id', statisticsController.delete);

indexRouter.router = router;

module.exports = indexRouter;
