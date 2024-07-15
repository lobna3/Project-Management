const { Projekt, User, Task } = require('../orm')


module.exports = {
    getAllTasks: async (req, res) => {
        try {
            const tasks = await Task.findAll({
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: Projekt, as: "projekt", attributes: ["title", "description", "category",
                            "evaluation", "user_id", "imageUrl"],
                    },
                    {
                        model: User,
                        as: 'users',
                        attributes: ["id", "name", "email", "role"], 
                    }
                ]
            });
            res.status(200).json(tasks);
        } catch (error) {
            console.log(error);
            res.status(500).send("Failed to load resource");
        }
    },

    addTask: async (req, res) => {
        try {
            const task = await Task.create(req.body);

            res.status(201).json(task);

        } catch (error) {
            res.status(409).send(error);
        }
    },
    getAllProjkets: async (req, res) => {
        try {
            const projekts = await Projekt.findAll({
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: User, as: "user", attributes: ["name", "email", "role"],
                    }, {
                        model: Task, as: "tasks", attributes: ["id","title", "description"]
                    }
                ]
            });
            res.status(200).json(projekts);
        } catch (error) {
            console.log(error);
            res.status(500).send("Failed to load resource");
        }
    },

    getOneProjekt: async (req, res) => {
        try {
            const projekt = await Projekt.findByPk(req.params.id, {
                include: [
                    {
                        model: User, as: "user", attributes: ["name", "email", "role"],
                    },{
                        model: Task, as: "tasks", attributes: ["id","title", "description"]
                    }
                ]
            })
                ;
            res.status(200).json(projekt);
        } catch (error) {
            res.status(500).send("Failed to load resource");
        }
    },

    deleteTask: async (req, res) => {
        const { id } = req.params;
        try {
          // Find the projekt by its primary key (id) and delete it
          const deletedProjekt = await Task.findByPk(id);
    
          if (!deletedProjekt) {
            return res.status(404).send("Projekt not found");
          }
    
          await deletedProjekt.destroy();
    
          res.status(200).json({ message: "Task deleted successfully" });
        } catch (error) {
          console.error(error);
          res.status(500).send("Failed to delete projekt");
        }
      },

}