/********************************
 * Team Model for Swarm
 * 
 * @author Scrumblebees
 * 
 * 2019-08-17
 ********************************/

module.exports = function (sequelize, DataTypes) {
    var Team = sequelize.define("Team", {
        team_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });

    Team.associate = function (models) {
        Team.hasMany(models.Employee, {
        });
    };

    return Team;
};