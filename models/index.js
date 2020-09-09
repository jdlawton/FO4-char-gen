const User = require('./User');
const Dlc = require('./Dlc');
const Perk = require('./Perk');
const Character = require('./Character');
const CharacterPerk = require('./CharacterPerk');

//create associations
User.hasMany(Character);

Character.belongsTo(User);

Dlc.hasMany(Perk);

Perk.belongsTo(Dlc);

Character.belongsToMany(Perk, {
    through: CharacterPerk,
    as: 'character_perks'
    //foreignKey: 'character_id'
});

Perk.belongsToMany(Character, {
    through: CharacterPerk,
    as: 'character_perks'
    //foreignKey: 'perk_id'
})

CharacterPerk.belongsTo(Character);

Character.hasMany(CharacterPerk);

CharacterPerk.belongsTo(Perk);

Perk.hasMany(CharacterPerk);


module.exports = {User, Dlc, Perk, Character, CharacterPerk};