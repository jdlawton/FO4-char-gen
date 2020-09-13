//The functions in this script are ones that do additional manipulations to the data that is retrieved from the databases. I included them all here 
//both to eliminate the need to write the same code in multiple places elsewhere and to try and keep my scripts in the controllers directory about
//retrieving and rendering data as much as I can.

//const router = require('express').Router();
const sequelize = require('../config/connection');
const {Perk, Dlc} = require('../models/');

//this function takes the array of perks that a character already possesses (which is obtained from the CharacterPerk through table), and 
//looks up each of the perks in the perk table to get all of the necessary information that will be needed to display the perk info on the
//front end.
async function perkLookup (perkArray) {

    for (let i=0; i<perkArray.length; i++){
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
        perkArray[i].name = perk_data.name;
        perkArray[i].perk_rank = perk_data.perk_rank;
        perkArray[i].effect = perk_data.effect;
    }

    return perkArray;
}

//This function creates the list of perks that the character is eligible for at a given level. Perks have two requirements, all perks have a level requirement (which can be level 1),
//and a second requirement. The second requriement can either be a SPECIAL stat of a certain rank, or having the previous rank of the given perk, i.e. Rifleman Rank 2 requires
//Rifleman Rank 1. This function first adds all of the perks that a character is eligible for, taking all of these things into consideration as well as ensuring we do not end up
//with any duplicate perks in the list.

async function getAvailablePerks(characterData) {

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

    allPerks = allPerksArray.map(perks => perks.get({plain: true}));

    //This is going to be the array of available perks that the app build and ultimately returns.
    let availablePerksArray = [];
    
    //The meat of the function involves a series of loops. We are going to loop through the list of all perks that we retrieved from the perk table.
    for (let i=0; i<allPerks.length; i++) {
        let duplicatePerk = false;
        
        //if the perk is one that has a Strength requirement and the character meets that requirement, loop through the array of perks the 
        //character already has and see if they have already selected this perk. If so, mark it as a duplicate. If not, push it to the array
        //of available perks.
        if(allPerks[i].req_name === "Strength" && allPerks[i].req_rank <= characterData.strength) {
            for (let k=0; k<characterData.character_perks.length; k++){
                if(allPerks[i].id === characterData.character_perks[k].perk_id){
                    duplicatePerk = true;
                }
            }
            if(!duplicatePerk){
                availablePerksArray.push(allPerks[i]);
            }
        }

        //The same as above, but for perks with a Perception requriement.
        if(allPerks[i].req_name === "Perception" && allPerks[i].req_rank <= characterData.perception) {
            for (let k=0; k<characterData.character_perks.length; k++){
                if(allPerks[i].id === characterData.character_perks[k].perk_id){
                    duplicatePerk = true;
                }
            }
            if(!duplicatePerk){
                availablePerksArray.push(allPerks[i]);
            }
        }

        //The same as above, but for perks with a Endurance requriement.
        if(allPerks[i].req_name === "Endurance" && allPerks[i].req_rank <= characterData.endurance) {
            for (let k=0; k<characterData.character_perks.length; k++){
                if(allPerks[i].id === characterData.character_perks[k].perk_id){
                    duplicatePerk = true;
                }
            }
            if(!duplicatePerk){
                availablePerksArray.push(allPerks[i]);
            }
        }

        //The same as above, but for perks with a Charisma requriement.
        if(allPerks[i].req_name === "Charisma" && allPerks[i].req_rank <= characterData.charisma) {
            for (let k=0; k<characterData.character_perks.length; k++){
                if(allPerks[i].id === characterData.character_perks[k].perk_id){
                    duplicatePerk = true;
                }
            }
            if(!duplicatePerk){
                availablePerksArray.push(allPerks[i]);
            }
        }

        //The same as above, but for perks with a Intelligence requriement.
        if(allPerks[i].req_name === "Intelligence" && allPerks[i].req_rank <= characterData.intelligence) {
            for (let k=0; k<characterData.character_perks.length; k++){
                if(allPerks[i].id === characterData.character_perks[k].perk_id){
                    duplicatePerk = true;
                }
            }
            if(!duplicatePerk){
                availablePerksArray.push(allPerks[i]);
            }
        }

        //The same as above, but for perks with an Agility requriement.
        if(allPerks[i].req_name === "Agility" && allPerks[i].req_rank <= characterData.agility) {
            for (let k=0; k<characterData.character_perks.length; k++){
                if(allPerks[i].id === characterData.character_perks[k].perk_id){
                    duplicatePerk = true;
                }
            }
            if(!duplicatePerk){
                availablePerksArray.push(allPerks[i]);
            }
        }

        //The same as above, but for perks with a Luck requriement.
        if(allPerks[i].req_name === "Luck" && allPerks[i].req_rank <= characterData.luck) {
            for (let k=0; k<characterData.character_perks.length; k++){
                if(allPerks[i].id === characterData.character_perks[k].perk_id){
                    duplicatePerk = true;
                }
            }
            if(!duplicatePerk){
                availablePerksArray.push(allPerks[i]);
            }
        }

        
        //if the perk is not a rank 1 perk, it will require the previous rank of the perk instead of a SPECIAL stat. this look looks at each element in the allPerks array
        //and compares the potential perk's req_name and req_rank agains the character's existing perks in the characters character_perks array. If the requirement name and 
        //rank matches the name and rank of an existing perk, it then loops through the character_perks arrray again to see if the potential perk allPerks[i] already exists in
        //the character_perks array. If it is not a duplicate, push it to the availablePerksArray.
        for (let j=0; j<characterData.character_perks.length; j++){
            if(allPerks[i].req_name === characterData.character_perks[j].name && allPerks[i].req_rank === characterData.character_perks[j].perk_rank && allPerks[i].req_level <= characterData.level){
                    for (let k=0; k<characterData.character_perks.length; k++){
                        if(allPerks[i].name === characterData.character_perks[k].name && allPerks[i].perk_rank === characterData.character_perks[k].perk_rank){
                            duplicatePerk = true;
                        }
                    }
                    if(!duplicatePerk){
                        availablePerksArray.push(allPerks[i]);
                    }
                    
                
            }
        }
    }

    return availablePerksArray;
}

//This function calculates the character's derived stats (health, action points, carry weight, and resistances). I didn't want to make these entries in the 
//character model because they are easy enough to calculate and it means less api/database calls to update data as perks are selected.
const calculateDerivedStats = function (characterData) {


    let baseHealth = parseInt(characterData.endurance) * 5 + 80
    let leveledHealth = parseInt(characterData.endurance) / 2 + 2.5
    let health = (parseInt(characterData.level) - 1) * leveledHealth + baseHealth;
    let actionPoints = parseInt(characterData.agility) * 10 + 60;
    let carryWeight = parseInt(characterData.strength) * 10 + 200;
    let damageResist = 0;
    let energyResist = 0;
    let poisonResist = 0;
    let radiationResist = 0;


    //loop through the array of owned perks and apply any static bonuses from owned perks.
    for (let i=0; i<characterData.character_perks.length; i++){
        if (characterData.character_perks[i].perk_id === 23){
            //Strong Back Rank 1
            carryWeight += 25;
        }

        if (characterData.character_perks[i].perk_id === 24){
            //Strong Back Rank 2
            carryWeight += 50;
        }

        if (characterData.character_perks[i].perk_id === 63){
            //Refractor Rank 1
            console.log("Adding refractor 1");
            energyResist += 10;
            console.log(energyResist);
        }

        if (characterData.character_perks[i].perk_id === 64){
            //Refractor Rank 2
            energyResist += 10;
        }

        if (characterData.character_perks[i].perk_id === 65){
            //Refractor Rank 3
            energyResist += 10;
        }

        if (characterData.character_perks[i].perk_id === 66){
            //Refractor Rank 4
            energyResist += 10;
        }

        if (characterData.character_perks[i].perk_id === 67){
            //Refractor Rank 5
            energyResist += 10;
        }

        if (characterData.character_perks[i].perk_id === 76){
            //Toughness Rank 1
            damageResist += 10;
        }

        if (characterData.character_perks[i].perk_id === 77){
            //Toughness Rank 2
            damageResist += 10;
        }

        if (characterData.character_perks[i].perk_id === 78){
            //Toughness Rank 3
            damageResist += 10;
        }

        if (characterData.character_perks[i].perk_id === 79){
            //Toughness Rank 4
            damageResist += 10;
        }

        if (characterData.character_perks[i].perk_id === 80){
            //Toughness Rank 5
            damageResist += 10;
        }

        if (characterData.character_perks[i].perk_id === 84){
            //Life Giver Rank 1
            health += 20;
        }

        if (characterData.character_perks[i].perk_id === 85){
            //Life Giver Rank 2
            health += 20;
        }

        if (characterData.character_perks[i].perk_id === 86){
            //Life Giver Rank 3
            health += 20;
        }

        if (characterData.character_perks[i].perk_id === 91){
            //Rad Resistant Rank 1
            radiationResist += 10;
        }

        if (characterData.character_perks[i].perk_id === 92){
            //Rad Resistant Rank 2
            radiationResist += 10;
        }

        if (characterData.character_perks[i].perk_id === 93){
            //Rad Resistant Rank 3
            radiationResist += 10;
        }

        if (characterData.character_perks[i].perk_id === 94){
            //Rad Resistant Rank 4
            radiationResist += 10;
        }

        if (characterData.character_perks[i].perk_id === 202){
            //Quick Hands Rank 3
            actionPoints += 10;
        }

    }

    //add all of the derived stats to the character object, then return the object.
    characterData.health = health;
    characterData.actionPoints = actionPoints;
    characterData.carryWeight = carryWeight;
    characterData.damageResist = damageResist;
    characterData.energyResist = energyResist;
    characterData.poisonResist = poisonResist;
    characterData.radiationResist = radiationResist;
    return characterData;

}


module.exports = {perkLookup, getAvailablePerks, calculateDerivedStats};
