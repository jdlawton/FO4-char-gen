const perkWrapperEl = document.querySelector("#available-perk-wrapper");
const modalPerkNameEl = document.querySelector("#modal-perk-name");
const modalPerkRankEl = document.querySelector("#modal-perk-rank");
const modalPerkEffectEl = document.querySelector("#modal-perk-effect");
const spanPerkNameEl = document.querySelector("#span-perk-name");
const spanPerkRankEl = document.querySelector("#span-perk-rank");
const spanPerkEffectEl = document.querySelector("#span-perk-effect");

//when a post id edited, and the update button is pressed, this function will send the PUT to the api to update the database with the new info.
async function editFormHandler(event) {
    console.log("Inside editFormHandler");
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
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const selectPerk = function (event) {
    console.log(event);
    //console.log(event.target);
    //console.log(event.path[0].childNodes[1].innerHTML);
    modalPerkNameEl.textContent = event.path[0].childNodes[1].innerHTML;
    modalPerkRankEl.textContent = "Rank: " + event.path[0].childNodes[3].innerHTML;
    modalPerkEffectEl.textContent = event.path[0].childNodes[6].innerHTML;
    //console.log(modalPerkNameEl.textContent);
    modal.style.display = "block";
}

document.querySelector('#edit-character-form').addEventListener('submit', editFormHandler);
perkWrapperEl.addEventListener('click', selectPerk);