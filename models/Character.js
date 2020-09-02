const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Character extends Model {}

Character.init(
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
        },
        strength: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        perception: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        endurance: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        charisma: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        intelligence: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        agility: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        luck: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'character'
    }
);

module.exports = Character;