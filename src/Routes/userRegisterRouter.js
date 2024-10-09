const router = require('express').Router();
const { userRegister } = require('../controllers/userResgister');
const { userValidation } = require('../models/UserModel');

router.post('/register', userRegister, userValidation);

module.exports = router;