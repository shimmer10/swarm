/********************************
 * Team Model for Swarm
 * 
 * @author Scrumblebees
 * 
 * 2019-08-17
 ********************************/

module.exports = function (sequelize, DataTypes) {
    var Employee_Profile = sequelize.define("Employee_Profile", {
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
            validate: {
                allowNull: false
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                allowNull: false
            }
        },
        employee_number: {
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
        },
        last_login: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },
    });

    // Place.associate = function (models) {
    //     Place.hasMany(models.Review, {
    //         onDelete: "cascade",
    //         hooks: true
    //     });
    // };

    return Employee_Profile;
};