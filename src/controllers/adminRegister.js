const hashUtil = require('../utils/hashUtil');
const { Admin } = require('../models/AdminModel');

const adminRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
    
        const IfAdminExists = await Admin.findOne({ email });
        if (IfAdminExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        const hashedPassword = hashUtil.hashPassword(password);
        const admin = new Admin({
            name,
            email,
            password: hashedPassword,
        });
        admin.save();
        res.status(201).json({ message: 'Admin created successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: error});
    }
}

module.exports = { adminRegister };