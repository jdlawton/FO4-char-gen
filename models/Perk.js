const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Perk extends Model {}

Perk.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        requirement: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lvl_requirement: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        num_ranks: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        effect: {
            type: DataTypes.STRING,
            allowNull: false
        },
        granted_by: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dlc_id: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            references: {
                model: 'dlc',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'perk'
    }
);

module.exports = Perk;