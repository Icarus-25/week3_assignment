/*
 * Sequelize Song model definition
 */

module.exports = (sequelize, DataTypes) => {
    const Song = sequelize.define('Song', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: true
        },
        yearReleased: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'Songs',
        timestamps: true
    });

    return Song;
};
