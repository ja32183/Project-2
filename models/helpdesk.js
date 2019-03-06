module.exports = function(sequelize, DataTypes) {
    var Helpdesk = sequelize.define("Helpdesk", {
        Opened_By: DataTypes.STRING,
        Title: DataTypes.TEXT,
        Status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Open"
        },
        Assigned_To: DataTypes.STRING,
        Description: {
            type: DataTypes.TEXT,
            validate: {
                len: [1]
            }
        },
        Closed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    return Helpdesk;
};