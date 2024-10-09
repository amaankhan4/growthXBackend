const jwt = require('jsonwebtoken');
const { User } = require('../models/UserModel');
const { Admin } = require('../models/AdminModel');

const verifyToken = async (req, res) => {
  const { token } = req.body;
  console.log("token", token);
  if (!token) {
      return res.status(400).json({ valid: false, message: 'No token provided' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const email = decoded.email;
      const user = await User.findOne({ email });
      if (!user) {

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ valid: false, message: 'Invalid token' });
        }
      }

      res.json({ valid: true, email: email });
  } catch (err) {
      console.error('Error verifying token:', err);
      res.status(400).json({ valid: false, message: 'Invalid token' });
  }
};

module.exports = verifyToken;