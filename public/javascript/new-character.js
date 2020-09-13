//This script handles the new character form, once the form is filled out, it pulls the data and makes the api call to create the new character.

const specialEl = document.querySelector(".special-stats");
const newCharFormEl = document.querySelector(".new-character-form");
const pointsAvailableEl = document.querySelector("#points-available");
const curStrEl = document.querySelector("#cur-str");
const curPerEl = document.querySelector("#cur-per");
const curEndEl = document.querySelector("#cur-end");
const curChaEl = document.querySelector("#cur-cha");
const curIntEl = document.querySelector("#cur-int");
const curAgiEl = document.querySelector("#cur-agi");
const curLckEl = document.querySelector("#cur-lck");
const newCharBtn = document.querySelector("#new-char-btn");

//this function handles the user clicking on the arrow buttons to distribute their available SPECIAL stats.
const assignStats = function (event) {
    event.preventDefault();

    let curStr = parseInt(curStrEl.textContent);
    let curPer = parseInt(curPerEl.textContent);
    let curEnd = parseInt(curEndEl.textContent);
    let curCha = parseInt(curChaEl.textContent);
    let curInt = parseInt(curIntEl.textContent);
    let curAgi = parseInt(curAgiEl.textContent);
    let curLck = parseInt(curLckEl.textContent);
    let pointsAvailable = parseInt(pointsAvailableEl.textContent);


    if(event.target.id === "str-dwn" && curStr > 1){
        curStr --;
        pointsAvailable ++;
        pointsAvailableEl.textContent = pointsAvailable;
        curStrEl.textContent = curStr;
    }

    if(event.target.id === "str-up" && pointsAvailable > 0 && curStr < 10){
        curStr ++;
        pointsAvailable --;
        pointsAvailableEl.textContent = pointsAvailable;
        curStrEl.textContent = curStr;
    }

    if(event.target.id === "per-dwn" && curPer > 1){
        curPer --;
        pointsAvailable ++;
        pointsAvailableEl.textContent = pointsAvailable;
        curPerEl.textContent = curPer;
    }

    if(event.target.id === "per-up" && pointsAvailable > 0 && curPer < 10){
        curPer ++;
        pointsAvailable --;
        pointsAvailableEl.textContent = pointsAvailable;
        curPerEl.textContent = curPer;
    }

    if(event.target.id === "end-dwn" && curEnd > 1){
        curEnd --;
        pointsAvailable ++;
        pointsAvailableEl.textContent = pointsAvailable;
        curEndEl.textContent = curEnd;
    }

    if(event.target.id === "end-up" && pointsAvailable > 0 && curEnd < 10){
        curEnd ++;
        pointsAvailable --;
        pointsAvailableEl.textContent = pointsAvailable;
        curEndEl.textContent = curEnd;
    }

    if(event.target.id === "cha-dwn" && curCha > 1){
        curCha --;
        pointsAvailable ++;
        pointsAvailableEl.textContent = pointsAvailable;
        curChaEl.textContent = curCha;
    }

    if(event.target.id === "cha-up" && pointsAvailable > 0 && curCha < 10){
        curCha ++;
        pointsAvailable --;
        pointsAvailableEl.textContent = pointsAvailable;
        curChaEl.textContent = curCha;
    }

    if(event.target.id === "int-dwn" && curInt > 1){
        curInt --;
        pointsAvailable ++;
        pointsAvailableEl.textContent = pointsAvailable;
        curIntEl.textContent = curInt;
    }

    if(event.target.id === "int-up" && pointsAvailable > 0 && curInt < 10){
        curInt ++;
        pointsAvailable --;
        pointsAvailableEl.textContent = pointsAvailable;
        curIntEl.textContent = curInt;
    }

    if(event.target.id === "agi-dwn" && curAgi > 1){
        curAgi --;
        pointsAvailable ++;
        pointsAvailableEl.textContent = pointsAvailable;
        curAgiEl.textContent = curAgi;
    }

    if(event.target.id === "agi-up" && pointsAvailable > 0 && curAgi < 10){
        curAgi ++;
        pointsAvailable --;
        pointsAvailableEl.textContent = pointsAvailable;
        curAgiEl.textContent = curAgi;
    }

    if(event.target.id === "lck-dwn" && curLck > 1){
        curLck --;
        pointsAvailable ++;
        pointsAvailableEl.textContent = pointsAvailable;
        curLckEl.textContent = curLck;
    }

    if(event.target.id === "lck-up" && pointsAvailable > 0 && curLck < 10){
        curLck ++;
        pointsAvailable --;
        pointsAvailableEl.textContent = pointsAvailable;
        curLckEl.textContent = curLck;
    }
}

//Once the stat points have been allocated, this function calls the api POST to create the character in the database.
async function newCharFormHandler (event) {
    event.preventDefault();
    const name = document.querySelector('input[name="character-name"]').value.trim();
    const level = 1;
    const description = document.querySelector('input[name="build-desc"]').value.trim();
    const pointsAvailable = parseInt(pointsAvailableEl.textContent);

    if (pointsAvailable === 0) {
        const response = await fetch('/api/characters', {
            method: 'POST',
            body: JSON.stringify({
                name,
                level,
                description,
                strength: curStrEl.textContent,
                perception: curPerEl.textContent,
                endurance: curEndEl.textContent,
                charisma: curChaEl.textContent,
                intelligence: curIntEl.textContent,
                agility: curAgiEl.textContent,
                luck: curLckEl.textContent
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (response.ok) {
            console.log("success!");
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    } else {
        alert("Please distribute all of your points before saving.");
    }
}

specialEl.addEventListener('click', assignStats);
newCharFormEl.addEventListener('submit', newCharFormHandler);