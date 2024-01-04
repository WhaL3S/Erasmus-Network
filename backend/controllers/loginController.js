const { User, Student, Representator } = require('../models');
const { Op } = require('sequelize');

const loginUser = async (req, res) => {
    const {login, password} = req.body;
    if (isNaN(login) || isNaN(password)) {
        return res.status(400).json({ error: 'Invalid user data.' });
      }

      try {
        const user = await User.findOne({
          where: { [Op.and]: [{ login: User.login }, { password: User.password }] },
        });
    
        res.json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};


module.exports = {
    loginUser,
  };