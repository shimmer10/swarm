/********************************
 * Team Model for Swarm
 * 
 * @author Scrumblebees
 * 
 * 2019-08-17
 ********************************/

module.exports = function (sequelize, DataTypes) {
    var Status = sequelize.define("Status", {
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        yesterday_description: {
            type: DataTypes.STRING,
            len: 254
        },
        today_description: {
            type: DataTypes.STRING,
            len:254
        },
        blocker_description: {
            type: DataTypes.STRING,
            len:254
        }
    });

    Status.associate = function (models) {
        Status.belongsTo(models.Member, {
            onDelete: "cascade",
            hooks: true
        });
    };

    return Status;
};