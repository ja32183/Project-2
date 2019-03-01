module.exports = function(sequelize, DataTypes) {
    var Helpdesk = sequelize.define("Helpdesk", {
        Opened_By: DataTypes.STRING,
        Title: DataTypes.TEXT,
        Status: DataTypes.STRING,
        Assigned_To: DataTypes.STRING,
        Description: DataTypes.TEXT,
        Closed: DataTypes.BOOLEAN
    });
    return Helpdesk;
};