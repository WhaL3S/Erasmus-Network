const {User, Student, Representator } = require('../models');
const { Op } = require('sequelize');

const openProfile = async (req, res) => {
    const {login, password} = req.body;
    if (isNaN(login) || isNaN(password)) {
        return res.status(400).json({ error: 'Invalid user data.' });
      }

      try {
        const user = await User.findOne({
          where: { [Op.and]: [{ login: User.login }, { password: User.password }] },
        });
        if(student = await Student.findOne({
            where: { id_user: user.id_user },
          })){
            res.json(student);
          }else{
            representator = await Representator.findOne({
                where: { id_user: user.id_user },
              });
              res.json(representator);
          }
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

const deleteProfile = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID.' });
  }
  try {
    const user = await User.findOne({
      where: { id_user: userId },
    });

    var student = await Student.findOne({
      where: { id_user: user.id_user },
    });
    await student.destroy();
    var representator = await Representator.findOne({
      where: { id_user: user.id_user },
    });
    await representator.destroy();
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const logoutUser = async (req, res) => {
  
};

module.exports = {
    openProfile,
    deleteProfile
  };