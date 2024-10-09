const router = require('express').Router();
const { adminRegister } = require('../controllers/adminRegister');
const { adminValidation} = require('../models/AdminModel');

router.post('/register', adminRegister, adminValidation);

module.exports = router;