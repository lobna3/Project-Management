// Define and export the sequelize model that represents the table Projekts.

module.exports = (sequelize, DataTypes) => {
    const Projekt = sequelize.define("projekts", {
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
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        evaluation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }

    });

    return Projekt;
};