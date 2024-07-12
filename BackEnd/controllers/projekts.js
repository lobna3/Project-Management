const {Projekt,User} = require ('../orm')


module.exports ={

    getAllProjkets: async (req, res) => {
        try {
          const projekts = await Projekt.findAll({
            order: [["createdAt", "DESC"]],
            include: [
              {
                model: User, as: "user", attributes: ["name", "email"],
              }
            ]
          });
          res.status(200).json(projekts);
        } catch (error) {
          console.log(error);
          res.status(500).send("Failed to load resource");
        }
      },

      addProjekt: async (req, res) => {
        try {
          const projekt = await Projekt.create(req.body);
         
          res.status(201).json(projekt);
         
        } catch (error) {
          res.status(409).send(error);
        }
      },

      getOneProjekt: async (req, res) => {
        try {
          const projekt = await Projekt.findByPk(req.params.id,{
            include: [
                {
                  model: User, as: "user", attributes: ["name", "email"],
                }
              ]
          })
            ;
          res.status(200).json(projekt);
        } catch (error) {
          res.status(500).send("Failed to load resource");
        }
      },

      deleteProjekt: async (req, res) => {
        const { id } = req.params;
        try {
          // Find the projekt by its primary key (id) and delete it
          const deletedProjekt = await Projekt.findByPk(id);
    
          if (!deletedProjekt) {
            return res.status(404).send("Projekt not found");
          }
    
          await deletedProjekt.destroy();
    
          res.status(200).json({ message: "Projekt deleted successfully" });
        } catch (error) {
          console.error(error);
          res.status(500).send("Failed to delete projekt");
        }
      },
      updateProjekt: async (req, res) => {
        try {
    
          const projekt = await Projekt.findByPk(req.params.id);
    
          if (projekt) {
    
            projekt.title = req.body.title;
            projekt.description = req.body.description;
            projekt.imageUrl = req.body.imageUrl;
            projekt.category = req.body.category;
            projekt.evaluation = req.body.evaluation;
            projekt.user_id = req.body.user_id
    
            await projekt.save();
    
            res.status(200).json(projekt);
          } else {
    
            res.status(404).send("Projekt not found");
          }
        } catch (error) {
    
          console.error("Failed to update projekt:", error);
          res.status(500).send("Failed to update projekt");
        }
      },

      findByTitle: async (req, res) => {
        const title = req.params.title
        try {
          const projekt = await Projekt.findOne({
            where: {
              title: title,
            }
          });
          res.status(200).json(projekt);
        } catch (error) {
          res.status(500).send("Failed to load resource");
        }
      },
}