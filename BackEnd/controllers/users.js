const {User} = require ('../orm')


module.exports={
    getAllUsers: async (req, res) => {
        try {
          const users = await User.findAll();
          res.status(200).json(users);
        } catch (error) {
          console.log(error);
          res.status(500).send("Failed to load resource");
        }
      },
      
      adduser: async (req, res) => {
        try {
          const user = await User.create(req.body);
          console.log(user)
          res.status(201).json(user);
         
        } catch (error) {
          res.status(409).send(error);
        }
      },
}