/********************************
 * Team Model for Swarm
 * 
 * @author Scrumblebees
 * 
 * 2019-08-17
 ********************************/

module.exports = function (sequelize, DataTypes) {
    var Session = sequelize.define("Session", {
        session_date: {
            type: DataTypes.DATE,
            validate: {
                allowNull: false
            }
        },
        team_name: {
            type: DataTypes.STRING,
            validate: {
                allowNull: false
            }
        }
    });

    Session.associate = function (models) {
        Session.hasMany(models.Member, {
            onDelete: "cascade",
            hooks: true
        });
        Session.belongsTo(models.Team, {
        });
    };

    return Session;
};