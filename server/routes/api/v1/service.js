var express = require('express');
var router = express.Router();
var indexRouter = {};

var serviceController = require('../../../controllers/service');


//返回book的集合
router.get('/', serviceController.find);

//返回指定的book
router.get('/:id', serviceController.findById);

//创建book
router.post('/', serviceController.create);

//更新book全部信息
router.put('/:id', serviceController.update);

//更新book部分信息
router.patch('/:id', serviceController.patch);

//批量删除
router.delete('/batch/:ids', serviceController.deleteBatch);

//删除指定的book
router.delete('/:id', serviceController.delete);

indexRouter.router = router;

module.exports = indexRouter;
