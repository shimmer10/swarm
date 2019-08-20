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
            validate: {
                allowNull: false
            }
        },
        role: {
            type: DataTypes.STRING,
            validate: {
                allowNull: false
            }
        },
        image_link: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            }
        }
    });

    Member.associate = function (models) {
        Member.belongsTo(models.Employee_Profile, {
        });
    };

    return Member;
};