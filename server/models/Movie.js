/*
 * Sequelize Movie model definition
 */

module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('Movie', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        director: {
            type: DataTypes.STRING,
            allowNull: true
        },
        yearReleased: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'Movies',
        timestamps: true
    });

    return Movie;
};
