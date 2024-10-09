const router = require('express').Router();
const { acceptAssignment,rejectAssignment } = require('../controllers/adminAssignments');

router.post('/assignments/:id/accept', acceptAssignment);

router.post('/assignments/:id/reject', rejectAssignment);

module.exports = router;