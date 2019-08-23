/********************************
 * Project Model for Swarm
 * 
 * @author Scrumblebees
 * 
 * 2019-08-17
 ********************************/

module.exports = function (sequelize, DataTypes) {
    var Project = sequelize.define("Project", {
        project_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                len: 254
            }
        }
    });

    // Place.associate = function (models) {
    //     Place.hasMany(models.Review, {
    //         onDelete: "cascade",
    //         hooks: true
    //     });
    // };

    return Project;
};