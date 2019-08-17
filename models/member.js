/********************************
 * Team Model for Swarm
 * 
 * @author Scrumblebees
 * 
 * 2019-08-17
 ********************************/

module.exports = function (sequelize, DataTypes) {
    var Member = sequelize.define("Member", {
        employee_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image_link: {
            type: DataTypes.STRING,
            isUrl: true
        }
    });

    Member.associate = function (models) {
        Member.hasOne(models.Employee, {
        });
    };

    return Member;
};