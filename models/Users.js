module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        Username: DataTypes.STRING,
        Password: DataTypes.STRING,
        Admin: DataTypes.BOOLEAN,
    });

    Users.associate = function(models) {
        Users.hasMany(models.Helpdesk);
    };
    return Users;
};