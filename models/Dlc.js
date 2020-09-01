const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Dlc extends Model {}

Dlc.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'dlc'
    }
);

module.exports = Dlc;