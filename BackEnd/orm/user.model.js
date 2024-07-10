// Define and export the sequelize model that represents the table Users.

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    });

    return User;
};