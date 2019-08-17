/********************************
 * Team Model for Swarm
 * 
 * @author Scrumblebees
 * 
 * 2019-08-17
 ********************************/

module.exports = function (sequelize, DataTypes) {
    var Employee = sequelize.define("Employee", {
        employee_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employee_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image_link: {
            type: DataTypes.STRING,
            isUrl: true
        }
    });

    // Place.associate = function (models) {
    //     Place.hasMany(models.Review, {
    //         onDelete: "cascade",
    //         hooks: true
    //     });
    // };

    return Employee;
};