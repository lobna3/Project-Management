// Define and export the sequelize model that represents the table Tasks.

module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("tasks", {

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: false,
            validate: {
                len: [0, 1000],
            },
        },
        projekt_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }

    });

    return Task;
};