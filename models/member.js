/********************************
 * Member Model for Swarm
 * 
 * @author Scrumblebees
 * 
 * 2019-08-17
 ********************************/

module.exports = function (sequelize, DataTypes) {
    var Member = sequelize.define("Member", {
        first_name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        last_name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image_link: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            }
        }
    });

    Member.associate = function (models) {
        Member.belongsTo(models.Session, {foreignKey: 'SessionId'
        });

        Member.belongsTo(models.Employee, {
        });

        Member.hasOne(models.Status, {
        });
    };

    return Member;
};