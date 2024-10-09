const hashUtil = require('../utils/hashUtil');
const { User } = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exists' });
        }
        
        const checkPassword = hashUtil.comparePassword(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ email: user.email, lastActivity:Date.now() }, 
        process.env.JWT_SECRET, { expiresIn: '7d' });

        const { password: pass, ...rest } = user._doc;

        res.cookie("auth-token", token, { httpOnly: true, secure: true, sameSite: 'Strict' })
        .status(200)
        .json({ ...rest, token });
        
    }
    catch (error) {
        return res.status(500).json({ message: "Failed" });
    }
}

module.exports = { userLogin };