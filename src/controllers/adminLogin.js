const { Admin } = require("../models/AdminModel");
const hashUtil = require("../utils/hashUtil");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Admin does not exist' });
        }
        console.log(admin);
        const checkPassword = hashUtil.comparePassword(password, admin.password);
        if (!checkPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        console.log(checkPassword);

        const token = jwt.sign({ email: admin.email, lastActivity:Date.now() },
        process.env.JWT_SECRET, { expiresIn: '7d' });

        const { password: pass, ...rest } = admin._doc;

        res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: 'Strict' })
        .status(200)
        .json({ ...rest, token, message: 'Login successful' });

        console.log('Login successful');

    }
    catch (error) {
        return res.status(500).json({ message: "Failed" });
    }
}

module.exports = { adminLogin };