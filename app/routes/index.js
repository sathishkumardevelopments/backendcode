var express = require('express');
var router = express.Router();
const { validatorMiddleware } = require('../middleware/validatorMiddleware')
const { loginValidator } = require('../controller/auth/validator/loginValidator')
const { registerValidator } = require('../controller/auth/validator/registerValidator')
const { LoginController } = require('../controller/auth/LoginController')
const { RegisterController } = require('../controller/auth/RegisterController')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login',loginValidator,validatorMiddleware,LoginController);
router.post('/register',registerValidator,validatorMiddleware,RegisterController);


module.exports = router;
