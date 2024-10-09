const router = require('express').Router();
const verifyToken = require('../middlewares/verifyAuthToken');

router.post('/verify-token',verifyToken);

module.exports = router;