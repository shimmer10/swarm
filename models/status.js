/********************************
 * Status Model for Swarm
 * 
 * @author Scrumblebees
 * 
 * 2019-08-17
 ********************************/

module.exports = function (sequelize, DataTypes) {
    var Status = sequelize.define("Status", {
        current_status: {
            type: DataTypes.STRING,
            validate: {
                allowNull: false
            }
        },
        yesterday_description: {
            type: DataTypes.STRING,
            validate: {
                len: 254
            }
        },
        today_description: {
            type: DataTypes.STRING,
            validate: {
                len: 254
            }
        },
        blocker_description: {
            type: DataTypes.STRING,
            validate: {
                len: 254
            }
        }
    });

    Status.associate = function (models) {
        Status.belongsTo(models.Member, {foreignKey: 'MemberId',
            onDelete: "cascade",
            hooks: true
        });
    };

    return Status;
};