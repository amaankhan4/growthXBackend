const hashUtil = require('../utils/hashUtil');
const { User } = require('../models/UserModel');

const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        const IfUserExists = await User.findOne({ email });
        if (IfUserExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = hashUtil.hashPassword(password);
        
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();
        
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: error});
    }
}

module.exports = { userRegister };