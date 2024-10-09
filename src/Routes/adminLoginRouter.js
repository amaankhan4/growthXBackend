const router = require('express').Router();
const { adminLogin } = require('../controllers/adminLogin');

router.post('/login', adminLogin);

module.exports = router;