const router = require('express').Router();
const sequelize = require('../config/connection');
const {Character, User, Perk, Dlc, CharacterPerk} = require('../models/');

async function perkLookup (perkArray) {
    //console.log("I'm inside perkLookup function.");
    //console.log("perkArray that was passed equals:")
    //console.log(perkArray);

    for (let i=0; i<perkArray.length; i++){
        //console.log(perkArray[i]);
        let perk_data = await Perk.findOne({
            where: {
                id: perkArray[i].perk_id
            },
            attributes: [
                'id',
                'name',
                'perk_rank',
                'effect'
            ]
        });


        perk_data = perk_data.get({plain: true});
        //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        //console.log(perk_data);
        //console.log(perk_data.name);
        //console.log(perk_data.effect);
        //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        perkArray[i].name = perk_data.name;
        perkArray[i].perk_rank = perk_data.perk_rank;
        perkArray[i].effect = perk_data.effect;
        //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        //console.log(perkArray[i]);
        //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    }

    //console.log("logging perkArray outside of loop");
    //console.log(perkArray);
    return perkArray;
        
    /*const perk_id = 45;
    const perk_result = await Perk.findOne({
        where: {
            id: perk_id
        },
        attributes: [
            'id',
            'name',
            'effect'
        ]
    });

    //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    //console.log(perk_result);
    //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    const perk_result_plain = perk_result.get({plain: true});
    //console.log("Perk Result AFTER:");
    //console.log(perk_result_plain);
    return(perk_result_plain);*/
}

async function getAvailablePerks(characterData) {
    console.log("Inside getAvailablePerks function");
    console.log(characterData);
    console.log(characterData.strength);
    let allPerksArray = await Perk.findAll ({
        attributes: [
            'id',
            'name',
            'perk_rank',
            'req_name',
            'req_rank',
            'req_level',
            'effect'
        ],
        include: [
            {
                model: Dlc,
                attributes: ['name']
            }
        ]
    });


    //allPerks = allPerks.get({plain: true});
    allPerks = allPerksArray.map(perks => perks.get({plain: true}));
    //console.log("--------------------------------------------------------------------");
    //console.log(allPerks);
    let availablePerksArray = [];

    //loop through the allPerks array and for each one, loop through all of the elements of the characterData.character_perks array.
    //if character level >= allPerks[i].req_level && characterData.characater_perks[i].name === allPerks[i].req_name &&& characterData.character_perks[i].perk_rank === allPerks[i].req_rank)
    //push into avaialblePerksArray. After availablePerksArray is built, return it.


}


module.exports = {perkLookup, getAvailablePerks};
