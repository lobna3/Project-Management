const { Sequelize, DataTypes } = require("sequelize");
const config = require("config");

//Create a Sequelize instance and pass the appropriate parameters separately
//You should modify 'database', 'username' and 'password' to fit your own credentials.
const sequelize = new Sequelize(config.database, config.user, config.password,
  {
    host: "localhost",
    dialect: "mysql",
    logging: false
  }
);

//Create and export a db object which holds the sequelize models,
//with the respective associations.
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user.model')(sequelize, DataTypes)
db.Projekt = require('./projekt.model')(sequelize, DataTypes)
db.Task = require('./task.model')(sequelize, DataTypes)

// User Projekt Association
db.User.hasMany(db.Projekt, {
    as:"projekts",
    foreignKey: "user_id",
    onDelete: "CASCADE",
})

db.Projekt.belongsTo(db.User, {
    as: "users",
    foreignKey: "user_id",
    onDelete: "CASCADE",
})

//Projekt Task Association
db.Projekt.hasMany(db.Task,{
    as: "tasks",
    foreignKey: "projekt_id",
    onDelete: "CASCADE",
})
db.Task.belongsTo(db.Projekt,{
    as: "projekts",
    foreignKey: "projekt_id",
    onDelete: "CASCADE",
})

// USers Tasks Association
db.User.belongsToMany(db.Task, {
    through: 'UsersTasks',
   
})
db.Task.belongsToMany(db.User, {
    through: 'UsersTasks',
   
})


db.sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully with database ProjektManagments."))
  .catch((err) => console.error("Unable to connect to the database:", err));

 /* sequelize.sync({force: true}).then(()=> {
    console.log('db sync'); })*/

module.exports = db;