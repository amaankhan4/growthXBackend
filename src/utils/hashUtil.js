const bcrypt = require('bcryptjs');

const hashUtil = {
  hashPassword: (password) => {
    return bcrypt.hashSync(password, 10);
  },

  comparePassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  },
};

module.exports = hashUtil;