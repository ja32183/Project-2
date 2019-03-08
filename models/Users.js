module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        Username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 100]
            }
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 100]
            }
        },
        Admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            allowNull: false
        }
    });

    return Users;
};