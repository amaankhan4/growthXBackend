const router = require('express').Router();
const { uploadAssignment } = require('../controllers/assignment');

router.post('/upload', uploadAssignment);

module.exports = router;