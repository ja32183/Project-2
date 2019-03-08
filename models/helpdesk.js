module.exports = function(sequelize, DataTypes) {
    var Helpdesk = sequelize.define("Helpdesk", {
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
        },
        Notes: {
            type: DataTypes.TEXT
        },
        Created_By: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Helpdesk;
};