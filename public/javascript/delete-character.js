 // Get the modal
const modal = document.querySelector("#delete-modal");
// Get the <span> element that closes the modal
const span = document.querySelector(".close");
const cancelBtnEl = document.querySelector("#cancel-btn");
const callDelModalEl = document.querySelector("#call-modal-btn");

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
  }

cancelBtnEl.onclick = function() {
    modal.style.display = "none";
}
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
 
  const showDeleteModal = function (){
    modal.style.display = "block";
  }

//this function is called when the delete button is clicked on a post. it sends a delete call to the api for the appropriate post id.
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