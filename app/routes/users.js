var express = require('express');
var router = express.Router();
const { ProductListController } = require('../controller/user/ProductListController')
const { UserOrderController } = require('../controller/user/UserOrderController')

/* GET users listing. */
router.post('/fetchproducts',ProductListController);
router.post('/placeorder',UserOrderController);




module.exports = router;
