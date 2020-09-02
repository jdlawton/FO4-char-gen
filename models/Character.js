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
        level: {
            type: DataTypes.INTEGER,
            defaultValue: 1
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
        hit_points: {
            type: DataTypes.INTEGER,
            defaultValue: 85
        },
        action_points: {
            type: DataTypes.INTEGER,
            defaultValue: 70
        },
        carry_weight: {
            type: DataTypes.INTEGER,
            defaultValue: 210
        },
        damage_res: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        energy_res: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        poison_res: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        radiation_res: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        melee_bonus: {
            type: DataTypes.INTEGER,
            defaultValue: 10
        },
        exp_mod: {
            type: DataTypes.INTEGER,
            defaultValue: 3
        },
        lv2_perk: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            references: {
                model: 'perk',
                key: 'id'
            }
        },
        lv3_perk: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            references: {
                model: 'perk',
                key: 'id'
            }
        },
        lv4_perk: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            references: {
                model: 'perk',
                key: 'id'
            }
        },
        lv5_perk: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            references: {
                model: 'perk',
                key: 'id'
            }
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