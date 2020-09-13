const perkWrapperEl = document.querySelector(".available-perks");
const editCharFormEl = document.querySelector('#edit-character-form');
const modalPerkNameEl = document.querySelector("#modal-perk-name");
const modalPerkRankEl = document.querySelector("#modal-perk-rank");
const modalPerkEffectEl = document.querySelector("#modal-perk-effect");
const modalPerkIdEl = document.querySelector("#modal-perk-id");
const modalPerkDlcEl = document.querySelector("#modal-perk-dlc");
const spanPerkNameEl = document.querySelector("#span-perk-name");
const spanPerkRankEl = document.querySelector("#span-perk-rank");
const spanPerkEffectEl = document.querySelector("#span-perk-effect");
const spanPerkIdEl = document.querySelector("#span-perk-id");
const spanPerkDlcEl = document.querySelector("#span-perk-dlc");
const levelEl = document.querySelector("#cur-lvl");
const character_id = window.location.toString().split('/')[
    window.location.toString().split('/').length-1
];

//elements related to the modal
const modal = document.querySelector("#perk-modal");
const span = document.querySelector(".close");
const addPerkBtnEl = document.querySelector("#add-perk-btn");
const cancelBtnEl = document.querySelector("#cancel-btn");

//if the user clicks on the X, or cancel button, or if the user clicks off of the modal, cancel without doing anything.
span.onclick = function() {
    modal.style.display = "none";
  }

cancelBtnEl.onclick = function() {
    modal.style.display = "none";
    return;
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//The form handler for the edit character form, which is specifically for changing the character name or
//changing the character description. Adding perks to the character is handled through the selectPerk/addPerk
//functions and require their own api call.
async function editFormHandler(event) {
    console.log("Inside editFormHandler");
    console.log(event.target);
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length-1
    ];

   const name = document.querySelector('input[name="character-name"]').value.trim();
   const level = document.querySelector("#cur-lvl").textContent;
   const description = document.querySelector('input[name="build-desc"]').value.trim();

   console.log("id: " + id);
   console.log("level: " + level);
   console.log("description: " + description);

    const response = await fetch(`/api/characters/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            level,
            description
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
        console.log("ok");
    } else {
        alert(response.statusText);
    }
}

//When the user clicks on an available perk, this function displays the modal and populates it with the appropriate data
//based on the perk clicked on.
const selectPerk = function (event) {
    if(!event.path[0].childNodes[1]){
        return;
    }
    modalPerkNameEl.textContent = event.path[0].childNodes[1].innerHTML;
    modalPerkRankEl.textContent = "Rank: " + event.path[0].childNodes[3].innerHTML;
    modalPerkEffectEl.textContent = event.path[0].childNodes[6].innerHTML;
    modalPerkIdEl.textContent = "ID: " + event.path[0].childNodes[9].innerHTML;
    modalPerkDlcEl.textContent = event.path[0].childNodes[11].innerHTML;
    modal.style.display = "block";
}

//When the user clicks on the button to confirm adding a perk in the modal, this function will make the fetch to the api
//to add the perk to the character and database.
async function addPerk (event) {
    //the fetch requires the character_id, the perk_id, and the level_taken
    //gets the perk_id from the modal and splits it to just include the id number.
    let perk_id = event.path[2].childNodes[3].innerText;
    perk_id = perk_id.split(' ')[1];
    //gets the current character level and increments it before adding the perk since the perk should be recorded for the 
    //next level due to perks being chosen at level up, i.e. if a character is level 4, they will next choose a perk when they
    //reach level 5, so we want to record that the perk is taken at level 5.
    level_taken = parseInt(levelEl.textContent);
    level_taken++;

    let response = await fetch(`/api/characters/addperk`, {
        method: 'PUT',
        body: JSON.stringify({
            character_id,
            perk_id,
            level_taken
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        console.log("perk added, calling updateLevel");
        updateLevel();
    }
}

//updates the level for the character in the character model.
async function updateLevel () {
    console.log("inside updateLevel");
    console.log("character_id: " + character_id);
    let level = parseInt(levelEl.textContent);
    level++;
    console.log("level: " + level);
    const response = await fetch(`/api/characters/${character_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            level
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok){
        console.log("character level updated successfully");
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

editCharFormEl.addEventListener('submit', editFormHandler);
perkWrapperEl.addEventListener('click', selectPerk);
addPerkBtnEl.addEventListener('click', addPerk);

