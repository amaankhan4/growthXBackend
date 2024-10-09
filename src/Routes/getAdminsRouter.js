const router = require('express').Router();
const { getAdmins } = require('../controllers/assignment');

router.get('/admins', getAdmins);

module.exports = router;