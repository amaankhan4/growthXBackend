const router = require('express').Router();
const { getAssignments } = require('../controllers/adminAssignments');

router.post('/assignments', getAssignments);

module.exports = router;