const modal = document.querySelector("#delete-modal");
const span = document.querySelector(".close");
const cancelBtnEl = document.querySelector("#cancel-btn");
const callDelModalEl = document.querySelector("#call-modal-btn");

//if the X or the Cancel button is clicked, or of the user clicks off of the modal, close the modal and do nothing.
span.onclick = function() {
    modal.style.display = "none";
  }

cancelBtnEl.onclick = function() {
    modal.style.display = "none";
}
  
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
 
//When the delete button is clicked on, display the modal
const showDeleteModal = function (){
  console.log("inside showDeleteModal");
  modal.style.display = "block";
}

//This function is called when the delete button in the modal is clicked. it sends a delete call to the api for the appropriate character.
async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length-1
    ];

    const response = await fetch(`/api/characters/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-character-btn').addEventListener('click', deleteFormHandler);
callDelModalEl.addEventListener('click', showDeleteModal);