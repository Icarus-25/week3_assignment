/*
 * Sequelize Book model definition
 * This file defines the Book model for Sequelize. The model will be
 * loaded by `server/models/index.js` which instantiates Sequelize.
 */

module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: true
        },
        yearPublished: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'Books',
        timestamps: true
    });

    return Book;
};
