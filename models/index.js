const User = require('./User');
const Dlc = require('./Dlc');
const Perk = require('./Perk');
const Character = require('./Character');
const CharacterPerk = require('./CharacterPerk');

//create associations
User.hasMany(Character, {
    foreignKey: 'user_id'
});

Character.belongsTo(User, {
    foreignKey: 'user_id'
});

Dlc.hasMany(Perk, {
    foreignKey: 'dlc_id'
});

Perk.belongsTo(Dlc, {
    foreignKey: 'dlc_id'
});

Character.belongsToMany(Perk, {
    through: CharacterPerk,
    as: 'character_perks',
    foreignKey: 'character_id'
});

Perk.belongsToMany(Character, {
    through: CharacterPerk,
    as: 'character_perks',
    foreignKey: 'perk_id'
})

CharacterPerk.belongsTo(Character, {
    foreignKey: 'character_id'
});

Character.hasMany(CharacterPerk, {
    foreignKey: 'character_id'
});

CharacterPerk.belongsTo(Perk, {
    foreignKey: 'perk_id'
});

Perk.hasMany(CharacterPerk, {
    foreignKey: 'perk_id'
});


module.exports = {User, Dlc, Perk, Character, CharacterPerk};