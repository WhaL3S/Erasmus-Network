const { Student, Representator } = require('../models');
const { Op } = require('sequelize');



const registerUser = async (req, res) => {
  const { username, usersurname, email,login,password} = req.body;
    try {
      if({passport_id, phone,linkedin} = req.body != null){
        const newUser = await Student.create({ username, usersurname, email,login,password,passport_id, phone,linkedin});
        res.json(newUser);
      }else{
        const{position, department,id_university} = req.body;
        const newUser = await Student.create({ username, usersurname, email,login,password,position, department,id_university});
        res.json(newUser);
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  
module.exports = {
  registerUser,
};