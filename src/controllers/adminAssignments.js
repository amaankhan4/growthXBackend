const { Assignment } = require('../models/UserModel');
const { Admin } = require('../models/AdminModel');
const axios = require('axios');

const getAssignments = async (req, res) => {
    try {
        const token = req.cookies['auth-token'];

        const checkTokenValidity = await axios.post('http://localhost:5000/auth/verify-token', { token });
        console.log(checkTokenValidity)
        if (!checkTokenValidity.data.valid) {
            return res.status(400).json({ message: "Invalid User" });
        }
        
        const email = checkTokenValidity.data.email;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Admin not found' });
        }
        
        const assignments = await Assignment.find({ admin: admin._id });

        res.status(200).json(assignments);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
}

const acceptAssignment = async (req, res) => {
    try {
      const assignmentId = req.params.id;
  
      const assignment = await Assignment.findByIdAndUpdate(assignmentId, { status: 'accepted' }, { new: true });
  
      if (!assignment) {
        return res.status(404).json({ message: 'Assignment not found' });
      }
  
      res.status(200).json({ message: 'Assignment accepted', assignment });
    } catch (error) {
      res.status(500).json({ message: 'Error accepting assignment', error });
    }
};
  
const rejectAssignment = async (req, res) => {
    try {
    const assignmentId = req.params.id;

    const assignment = await Assignment.findByIdAndUpdate(assignmentId, { status: 'rejected' }, { new: true });

    if (!assignment) {
        return res.status(404).json({ message: 'Assignment not found' });
    }

    res.status(200).json({ message: 'Assignment rejected', assignment });
    } catch (error) {
    res.status(500).json({ message: 'Error rejecting assignment', error });
    }
};

module.exports = { getAssignments, acceptAssignment, rejectAssignment };