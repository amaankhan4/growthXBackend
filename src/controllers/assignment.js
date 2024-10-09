const { Admin } = require('../models/AdminModel');
const { Assignment } = require('../models/UserModel');
const { User } = require('../models/UserModel');
const axios = require('axios');

const uploadAssignment = async (req, res) => {
    try {
        const { name, task, adminEmail } = req.body;

        const token = req.cookies['auth-token'];

        if (!token) {
            return res.status(401).json({ message: "UNAUTHORIZED Token Not Found" });
        }

        const checkTokenValidity = await axios.post('http://localhost:5000/auth/verify-token', { token });

        if (!checkTokenValidity.data.valid) {
            return res.status(401).json({ message: "UNAUTHORIZED" });
        }

        const email = checkTokenValidity.data.email;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const admin = await Admin.findOne({ email: adminEmail });
        if (!admin) {
            return res.status(400).json({ message: 'Admin not found' });
        }

        const assignment = new Assignment({
            user: user._id,
            name,
            task,
            admin: admin._id,
        });
        await assignment.save();

        res.status(201).json({ message: 'Assignment uploaded successfully' });
    }
    catch (error) {
        throw error;
    }
}

const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        const adminData = admins.map(admin => {
            return {
                name: admin.name,
                email: admin.email,
            }
        });
        res.status(200).json(adminData);
    }
    catch (error) {
        console.error('Error getting admins:', error);
        return res.status(500).json({ message: error });
    }
}

module.exports = { uploadAssignment, getAdmins };