const { User } = require('../orm')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

require("dotenv").config()

const Register = async (req, res) => {
    const { name, email, password, role } = req.body; 

    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role
      });


      res.status(201).json({ message: "success"});
    } catch (error) {
      
      console.error('Error in registration:', error);
      res.status(500).json({ message: 'Internal server error', error });
    }
}

const Login = async (req,res)=>{
    if(!req.body.email || !req.body.password){
    return res.status(400).json({ error: "username and password are required" });
    }
    try {
     const user = await User.findOne({where:{email:req.body.email}})
     if (!user) {
       // If user is not found
       return res.status(400).json({ error: "User not found. Please sign up." });
     }
     const isMatch = await bcrypt.compare(req.body.password,user.password)
     if(!isMatch){
       return res.status(400).json({ error: "Wrong Password" });
     }
     const token = jwt.sign(
       {
         id: user.id,
         name:user.name,
         email: user.email,
         role:user.role
       },
       process.env.JWT_SECRET,
       { expiresIn: '1h' }
     );
     res.status(200).json({
       message: "success",
       token: "Bearer " + token,
       role:user.role
     });

 
 } catch (error) {
  console.log(error);
   res.status(404).send(error);
 }

   }

module.exports = {Register,Login}