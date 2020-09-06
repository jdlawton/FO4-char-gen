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

document.querySelector('#edit-character-form').addEventListener('submit', editFormHandler);