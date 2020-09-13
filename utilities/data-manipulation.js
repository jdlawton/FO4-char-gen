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
    //console.log("Inside getAvailablePerks function");
    //console.log("============================================================");
    //console.log(characterData);
    //console.log("============================================================");
    //console.log(characterData.strength);
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
    //console.log(allPerks);
    //console.log("characterData.character_perks array");
    //console.log(characterData.character_perks);

    //loop through the allPerks array and for each one, loop through all of the elements of the characterData.character_perks array.
    //if character level >= allPerks[i].req_level && characterData.characater_perks[i].name === allPerks[i].req_name &&& characterData.character_perks[i].perk_rank === allPerks[i].req_rank)
    //push into avaialblePerksArray. After availablePerksArray is built, return it.

    //console.log(characterData.level);

    for (let i=0; i<allPerks.length; i++) {
        let duplicatePerk = false;
        //console.log (`Inside allPerks loop. Looking at element ${i}. Name: ${allPerks[i].name}, Rank: ${allPerks[i].perk_rank}`);
        /*if(allPerks[i].req_name === "Strength" || allPerks[i].req_name === "Perception" || allPerks[i].req_name === "Endurance" || allPerks[i].req_name === "Charisma" || allPerks[i].req_name === "Intelligence" || allPerks[i].req_name === "Agility" || allPerks[i].req_name === "Luck"){
            availablePerksArray.push(allPerks[i]);
        }*/

        //check if the potentialPerk(allPerks[i]) has a requirement name (Strength) and check if the character's strength is >= the perk's required strength
        //then if that is ok, check the potentialPerk agains the perks the character currently has, if there are any duplicates, ignore the potentialPerk.
        //if it is not a duplicate, add it to the availablePerksArray.
        if(allPerks[i].req_name === "Strength" && allPerks[i].req_rank <= characterData.strength) {
            for (let k=0; k<characterData.character_perks.length; k++){
                if(allPerks[i].id === characterData.character_perks[k].perk_id){
                    duplicatePerk = true;
                }
            }
            if(!duplicatePerk){
                availablePerksArray.push(allPerks[i]);
            }
            
            //availablePerksArray.push(allPerks[i]);
        }

        if(allPerks[i].req_name === "Perception" && allPerks[i].req_rank <= characterData.perception) {
            for (let k=0; k<characterData.character_perks.length; k++){
                if(allPerks[i].id === characterData.character_perks[k].perk_id){
                    duplicatePerk = true;
                }
            }
            if(!duplicatePerk){
                availablePerksArray.push(allPerks[i]);
            }
            //availablePerksArray.push(allPerks[i]);
        }

        if(allPerks[i].req_name === "Endurance" && allPerks[i].req_rank <= characterData.endurance) {
            for (let k=0; k<characterData.character_perks.length; k++){
                if(allPerks[i].id === characterData.character_perks[k].perk_id){
                    duplicatePerk = true;
                }
            }
            if(!duplicatePerk){
                availablePerksArray.push(allPerks[i]);
            }
            //availablePerksArray.push(allPerks[i]);
        }

        if(allPerks[i].req_name === "Charisma" && allPerks[i].req_rank <= characterData.charisma) {
            for (let k=0; k<characterData.character_perks.length; k++){
                if(allPerks[i].id === characterData.character_perks[k].perk_id){
                    duplicatePerk = true;
                }
            }
            if(!duplicatePerk){
                availablePerksArray.push(allPerks[i]);
            }
            //availablePerksArray.push(allPerks[i]);
        }

        if(allPerks[i].req_name === "Intelligence" && allPerks[i].req_rank <= characterData.intelligence) {
            for (let k=0; k<characterData.character_perks.length; k++){
                if(allPerks[i].id === characterData.character_perks[k].perk_id){
                    duplicatePerk = true;
                }
            }
            if(!duplicatePerk){
                availablePerksArray.push(allPerks[i]);
            }
            //availablePerksArray.push(allPerks[i]);
        }

        if(allPerks[i].req_name === "Agility" && allPerks[i].req_rank <= characterData.agility) {
            for (let k=0; k<characterData.character_perks.length; k++){
                if(allPerks[i].id === characterData.character_perks[k].perk_id){
                    duplicatePerk = true;
                }
            }
            if(!duplicatePerk){
                availablePerksArray.push(allPerks[i]);
            }
            //availablePerksArray.push(allPerks[i]);
        }

        if(allPerks[i].req_name === "Luck" && allPerks[i].req_rank <= characterData.luck) {
            for (let k=0; k<characterData.character_perks.length; k++){
                if(allPerks[i].id === characterData.character_perks[k].perk_id){
                    duplicatePerk = true;
                }
            }
            if(!duplicatePerk){
                availablePerksArray.push(allPerks[i]);
            }
            //availablePerksArray.push(allPerks[i]);
        }

        
        //if the perk is not a rank 1 perk, it will require the previous rank of the perk instead of a SPECIAL stat. this look looks at each element in the allPerks array
        //and compares the potential perk's req_name and req_rank agains the character's existing perks in the characters character_perks array. If the requirement name and 
        //rank matches the name and rank of an existing perk, it then loops through the character_perks arrray again to see if the potential perk allPerks[i] already exists in
        //the character_perks array. If it is not a duplicate, push it to the availablePerksArray.
        for (let j=0; j<characterData.character_perks.length; j++){
            //console.log(`Inside characterData.character_perks loop. Looking at element ${j}. Name: ${characterData.character_perks[j].name}, Rank: ${characterData.character_perks[j].perk_rank}`);
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

    //console.log("===========================================================================================");
    //console.log("RETURNING AVAILABLEPERKSARRAY")
    //console.log(availablePerksArray);
    //let returnArray = availablePerksArray.get({plain: true});
    return availablePerksArray;


}

const calculateDerivedStats = function (characterData) {
    // console.log("+++++++++++++++++++++++++++++++++++++++");
    // console.log("Inside calculateDerivedStats");
    // console.log("+++++++++++++++++++++++++++++++++++++++");
    // console.log(characterData);

    let baseHealth = parseInt(characterData.endurance) * 5 + 80
    let leveledHealth = parseInt(characterData.endurance) / 2 + 2.5
    let health = (parseInt(characterData.level) - 1) * leveledHealth + baseHealth;
    let actionPoints = parseInt(characterData.agility) * 10 + 60;
    let carryWeight = parseInt(characterData.strength) * 10 + 200;
    let damageResist = 0;
    let energyResist = 0;
    let poisonResist = 0;
    let radiationResist = 0;

    // console.log("Base Health: " + baseHealth);
    // console.log("Leveled Health: " + leveledHealth);
    // console.log("Total Health: " + health);
    // console.log("Action Points: " + actionPoints);
    // console.log("Carry Weight: " + carryWeight);

    //loop through the character_perks array and apply any static bonuses from owned perks.
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

    characterData.health = health;
    characterData.actionPoints = actionPoints;
    characterData.carryWeight = carryWeight;
    characterData.damageResist = damageResist;
    characterData.energyResist = energyResist;
    characterData.poisonResist = poisonResist;
    characterData.radiationResist = radiationResist;
    //console.log(characterData);
    return characterData;

}


module.exports = {perkLookup, getAvailablePerks, calculateDerivedStats};
