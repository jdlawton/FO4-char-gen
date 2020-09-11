//console.log("testing the script");
const specialEl = document.querySelector("#new-stats");
const pointsAvailableEl = document.querySelector("#points-available");
const curStrEl = document.querySelector("#cur-str");
const curPerEl = document.querySelector("#cur-per");
const curEndEl = document.querySelector("#cur-end");
const curChaEl = document.querySelector("#cur-cha");
const curIntEl = document.querySelector("#cur-int");
const curAgiEl = document.querySelector("#cur-agi");
const curLckEl = document.querySelector("#cur-lck");
const newCharBtn = document.querySelector("#new-char-btn");

const assignStats = function (event) {
    event.preventDefault();
    // console.log("inside assignStats");
    // console.log(event);
    // console.log("----------");
    // console.log(event.target);
    // console.log(event.target.textContent);
    // console.log(`Clicked on: ${event.target.id}`);
    // console.log(`Points Available: ${pointsAvailableEl.textContent}`);
    // console.log(`Current Str: ${curStrEl.textContent}`);
    // console.log(`Current Per: ${curPerEl.textContent}`);
    // console.log(`Current End: ${curEndEl.textContent}`);
    // console.log(`Current Cha: ${curChaEl.textContent}`);
    // console.log(`Current Int: ${curIntEl.textContent}`);
    // console.log(`Current Agi: ${curAgiEl.textContent}`);
    // console.log(`Current Lck: ${curLckEl.textContent}`);

    let curStr = parseInt(curStrEl.textContent);
    let curPer = parseInt(curPerEl.textContent);
    let curEnd = parseInt(curEndEl.textContent);
    let curCha = parseInt(curChaEl.textContent);
    let curInt = parseInt(curIntEl.textContent);
    let curAgi = parseInt(curAgiEl.textContent);
    let curLck = parseInt(curLckEl.textContent);
    let pointsAvailable = parseInt(pointsAvailableEl.textContent);

    //console.log (curStr);

    if(event.target.id === "str-dwn" && curStr > 1){
        curStr --;
        pointsAvailable ++;
        //console.log(`New Str: ${curStr}`);
        //console.log(`Points Available: ${pointsAvailable}`);
        pointsAvailableEl.textContent = pointsAvailable;
        curStrEl.textContent = curStr;
    }

    if(event.target.id === "str-up" && pointsAvailable > 0 && curStr < 10){
        curStr ++;
        pointsAvailable --;
        //console.log(`New Str: ${curStr}`);
        //console.log(`Points Available: ${pointsAvailable}`);
        pointsAvailableEl.textContent = pointsAvailable;
        curStrEl.textContent = curStr;
    }

    if(event.target.id === "per-dwn" && curPer > 1){
        curPer --;
        pointsAvailable ++;
        //console.log(`New Per: ${curPer}`);
        //console.log(`Points Available: ${pointsAvailable}`);
        pointsAvailableEl.textContent = pointsAvailable;
        curPerEl.textContent = curPer;
    }

    if(event.target.id === "per-up" && pointsAvailable > 0 && curPer < 10){
        curPer ++;
        pointsAvailable --;
        //console.log(`New Per: ${curPer}`);
        //console.log(`Points Available: ${pointsAvailable}`);
        pointsAvailableEl.textContent = pointsAvailable;
        curPerEl.textContent = curPer;
    }

    if(event.target.id === "end-dwn" && curEnd > 1){
        curEnd --;
        pointsAvailable ++;
        //console.log(`New End: ${curEnd}`);
        //console.log(`Points Available: ${pointsAvailable}`);
        pointsAvailableEl.textContent = pointsAvailable;
        curEndEl.textContent = curEnd;
    }

    if(event.target.id === "end-up" && pointsAvailable > 0 && curEnd < 10){
        curEnd ++;
        pointsAvailable --;
        //console.log(`New End: ${curEnd}`);
        //console.log(`Points Available: ${pointsAvailable}`);
        pointsAvailableEl.textContent = pointsAvailable;
        curEndEl.textContent = curEnd;
    }

    if(event.target.id === "cha-dwn" && curCha > 1){
        curCha --;
        pointsAvailable ++;
        //console.log(`New Cha: ${curCha}`);
        //console.log(`Points Available: ${pointsAvailable}`);
        pointsAvailableEl.textContent = pointsAvailable;
        curChaEl.textContent = curCha;
    }

    if(event.target.id === "cha-up" && pointsAvailable > 0 && curCha < 10){
        curCha ++;
        pointsAvailable --;
        //console.log(`New Cha: ${curCha}`);
        //console.log(`Points Available: ${pointsAvailable}`);
        pointsAvailableEl.textContent = pointsAvailable;
        curChaEl.textContent = curCha;
    }

    if(event.target.id === "int-dwn" && curInt > 1){
        curInt --;
        pointsAvailable ++;
        //console.log(`New Int: ${curInt}`);
        //console.log(`Points Available: ${pointsAvailable}`);
        pointsAvailableEl.textContent = pointsAvailable;
        curIntEl.textContent = curInt;
    }

    if(event.target.id === "int-up" && pointsAvailable > 0 && curInt < 10){
        curInt ++;
        pointsAvailable --;
        //console.log(`New Int: ${curInt}`);
        //console.log(`Points Available: ${pointsAvailable}`);
        pointsAvailableEl.textContent = pointsAvailable;
        curIntEl.textContent = curInt;
    }

    if(event.target.id === "agi-dwn" && curAgi > 1){
        curAgi --;
        pointsAvailable ++;
        //console.log(`New Agi: ${curAgi}`);
        //console.log(`Points Available: ${pointsAvailable}`);
        pointsAvailableEl.textContent = pointsAvailable;
        curAgiEl.textContent = curAgi;
    }

    if(event.target.id === "agi-up" && pointsAvailable > 0 && curAgi < 10){
        curAgi ++;
        pointsAvailable --;
        //console.log(`New Agi: ${curAgi}`);
        //console.log(`Points Available: ${pointsAvailable}`);
        pointsAvailableEl.textContent = pointsAvailable;
        curAgiEl.textContent = curAgi;
    }

    if(event.target.id === "lck-dwn" && curLck > 1){
        curLck --;
        pointsAvailable ++;
        //console.log(`New Lck: ${curLck}`);
        //console.log(`Points Available: ${pointsAvailable}`);
        pointsAvailableEl.textContent = pointsAvailable;
        curLckEl.textContent = curLck;
    }

    if(event.target.id === "lck-up" && pointsAvailable > 0 && curLck < 10){
        curLck ++;
        pointsAvailable --;
        //console.log(`New Lck: ${curLck}`);
        //console.log(`Points Available: ${pointsAvailable}`);
        pointsAvailableEl.textContent = pointsAvailable;
        curLckEl.textContent = curLck;
    }
}

async function newCharFormHandler (event) {
    event.preventDefault();

    //console.log("Inside the newCharFormHandler");
    const name = document.querySelector('input[name="character-name"]').value.trim();
    const level = document.querySelector("#cur-lvl").textContent;
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
    

    // console.log(`Character Name: ${name}`);
    // console.log(`Character Level: ${level}`);
    // console.log(`Build Description: ${description}`);
    // console.log(`Points Available: ${pointsAvailable}`);
    // console.log(`Strength: ${curStrEl.textContent}`);
    // console.log(`Perception: ${curPerEl.textContent}`);
    // console.log(`Endurance: ${curEndEl.textContent}`);
    // console.log(`Charisma: ${curChaEl.textContent}`);
    // console.log(`Intelligence: ${curIntEl.textContent}`);
    // console.log(`Agility: ${curAgiEl.textContent}`);
    // console.log(`Luck: ${curLckEl.textContent}`);


}

specialEl.addEventListener('click', assignStats);
document.querySelector('#new-character-form').addEventListener('submit', newCharFormHandler);