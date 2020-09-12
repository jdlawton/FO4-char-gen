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


// Get the modal
const modal = document.querySelector("#perk-modal");
// Get the <span> element that closes the modal
const span = document.querySelector(".close");
const addPerkBtnEl = document.querySelector("#add-perk-btn");
const cancelBtnEl = document.querySelector("#cancel-btn");

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
  }

cancelBtnEl.onclick = function() {
    //console.log("clicking cancel");
    modal.style.display = "none";
    return;
}
  
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
}
}

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
        //document.location.replace('/dashboard/');
        console.log("ok");
    } else {
        alert(response.statusText);
    }
}

//console.log(character);

// Get the modal


// Get the button that opens the modal
//var btn = document.getElementById("myBtn");



// When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }



const selectPerk = function (event) {
    //console.log(event);
    //console.log(event.target);
    if(!event.path[0].childNodes[1]){
        return;
    }
    modalPerkNameEl.textContent = event.path[0].childNodes[1].innerHTML;
    modalPerkRankEl.textContent = "Rank: " + event.path[0].childNodes[3].innerHTML;
    modalPerkEffectEl.textContent = event.path[0].childNodes[6].innerHTML;
    modalPerkIdEl.textContent = "ID: " + event.path[0].childNodes[9].innerHTML;
    modalPerkDlcEl.textContent = event.path[0].childNodes[11].innerHTML;
    //console.log(modalPerkNameEl.textContent);
    modal.style.display = "block";
}

async function addPerk (event) {
    console.log("Inside addPerk");
    console.log(event);
    let perk_id = event.path[2].childNodes[3].innerText;
    //console.log(perk_id.split(' '));
    perk_id = perk_id.split(' ')[1];
    level_taken = parseInt(levelEl.textContent);
    level_taken++;
    console.log("Perk id: " + perk_id);
    console.log("character id: "+ character_id);
    console.log("level taken: " + level_taken);

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

