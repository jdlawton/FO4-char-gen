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
        perk_rank: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        req_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        req_rank: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        req_level: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        effect: {
            type: DataTypes.STRING,
            allowNull: false
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