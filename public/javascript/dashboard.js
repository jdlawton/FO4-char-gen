const characterListEl = document.querySelector('.character-list');

const selectCharacter = function (event) {
    console.log("inside selectCharacter");
    console.log(event.target);
    console.log(event);

    if(!event.path[0].childNodes[3]){
        return;
    }

    characterId = event.path[0].childNodes[3].innerText;
    console.log(characterId);

    location.replace(`/dashboard/character/${characterId}`);
}

characterListEl.addEventListener('click', selectCharacter);