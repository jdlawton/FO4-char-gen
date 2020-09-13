//This is the through table for the many-to-many association used by the Character and Perk models, it also tracks the
//whcih level the character chose a particular perk.

const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class CharacterPerk extends Model {}

CharacterPerk.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        level_taken: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        character_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        perk_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'character_perk'
    }
);

module.exports = CharacterPerk;