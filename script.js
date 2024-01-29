let app = document.querySelector(".app");
const fightSound = new Audio("sounds/Fight.mp3")
const selectSound = new Audio("sounds/Select.mp3")

let mario = {
    name: "Mario",
    hp: 200,
    attack: 60,
    image: "images/mario.png"
}

let luigi = {
    name: "Luigi",
    hp: 140,
    attack: 80,
    image: "images/luigi.png"
}

let peach = {
    name: "Peach",
    hp: 100,
    attack: 110,
    image: "images/peach.png"
}

let yoshi = {
    name: "Yoshi",
    hp: 80,
    attack: 200,
    image: "images/yoshi.png"
}

let bowser = {
    name: "Bowser",
    hp: 300,
    attack: 40,
    image: "images/bowser.png"
}

const characterList = [mario, yoshi, peach, luigi]
let i = 0;


function characterRight() {
    if (i < 3) {

        selectSound.play();
        i ++;
        selectCharacter();
}
}

function characterLeft() {
    if (i > 0) {
        selectSound.play();
        i--;
        selectCharacter();
}
}

function selectCharacter() { 
    resetGame();
    app.innerHTML = /*HTML*/ `
    <div class="selectcharacter">
        <button onclick="characterLeft()">←</button>
        <img onclick="startFight()" class="bigcharacter" src="${characterList[i].image}">
        <button onclick="characterRight()">→</button>
    </div>
    <div class="character-info">
    <h1 class="stor-tekst">
    ${characterList[i].name}
    </h1>
    <h1 class="liten-tekst">HP: ${characterList[i].hp}</h1>
    <h1 class="liten-tekst">Attack: ${characterList[i].attack}</h1>
    </div>
    `;
}

selectCharacter();

function startFight() {
    fightSound.play();
    fight();
}

function fight() {
    playerCharacter = characterList[i]
    
    app.innerHTML = /*HTML*/ `
    <div class="fight-characters">
        <img src=${playerCharacter.image}>
        <img src=${bowser.image}>
    </div>
    <div class="fighttext">

            <h1> <span class="stor-tekst"> ${playerCharacter.name}</span> <span class="liten-tekst"> <br/> HP: ${playerCharacter.hp} </span></h1>

            <h1 class="stor-tekst">${bowser.name} <br/> HP: ${bowser.hp}</h1>
    </div>
    <div class="buttons">
        <button onclick="playerAttack()">Attack</button>
        <button onclick="bowserAttack()">Attack</button>
    </div>
    `

}

function playerAttack() {
    bowser.hp -= playerCharacter.attack;
    fight();
    gameOver();
}


function bowserAttack() {
    playerCharacter.hp -= bowser.attack;
    fight();
    gameOver();
}


function gameOver() {
    if (playerCharacter.hp <= 0) {

    app.innerHTML = /*HTML*/ `
    <div class="gameovertext">
    <h1>Bowser won!</h1>
    <img src=${bowser.image}>
    <button onclick="selectCharacter()">Play again</button>
    </div>
    `
} else if (bowser.hp <= 0) {
    app.innerHTML = /*HTML*/ `
    <div class="gameovertext">
    <h1>${playerCharacter.name} won!</h1>
    <img src=${playerCharacter.image}>
    <button onclick="selectCharacter()">Play again</button>
    </div>
    `
    }
}

function resetGame() {
    bowser.hp = 300;
    mario.hp = 200;
    luigi.hp = 140;
    peach.hp = 100;
    yoshi.hp = 80;
}