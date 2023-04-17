var express = require('express');
const { register, processRegister, profile, logout } = require('../controllers/userController');
const registerUserValidator = require('../validations/registerUserValidator');
var router = express.Router();

/* GET users listing. */
router
  .get('/', register)
  .post('/',registerUserValidator,processRegister)
  .get('/users', profile)
  .get('/logout', logout)

module.exports = router;
