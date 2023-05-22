import './style.css'
import Game from './game.ts'

declare global {
    interface Window { 
        gameState: Game,
    changeScreen: Function }
}

// Create a HTML element containing an Earth emoji for start/end screens
function newEarth() {
    const earth = document.createElement('div');
    earth.classList.add('earth-large');
    earth.innerText = String.fromCodePoint(0x1F30E);
    return earth;
}

// Create HTML element with falling star emoji for start screen
function newFallingStar() {
    const fallingStar = document.createElement('div');
    fallingStar.classList.add('falling-star');
    fallingStar.innerText = String.fromCodePoint(0x1F320);
    return fallingStar;
}



// Define start, win and lose screens
const startUI = document.createElement('div');
startUI.id = "startUI";
const title = document.createElement('h1');
title.innerText = "METEOTYPE";
const startImage = document.createElement('div');
startImage.classList.add('ui-image');
startImage.appendChild(newEarth());

const star1 = newFallingStar();
star1.classList.add('falling-star');
startImage.appendChild(star1);

const star2 = newFallingStar();
star2.classList.add('falling-star');
star2.style.top = '-80px';
star2.style.left = '10px';
star2.style.transform = "rotate(280deg)";
startImage.appendChild(star2);

const star3 = newFallingStar();
star3.classList.add('falling-star');
star3.style.top = '80px';
star3.style.left = '-30px';
star3.style.transform = "rotate(255deg)";
startImage.appendChild(star3);

const meteor = newFallingStar();
meteor.innerText = String.fromCodePoint(0x1F311);
meteor.classList.add('falling-star');
meteor.style.top = '-20px';
meteor.style.left = '-10px';
meteor.style.transform = "rotate(255deg)";
startImage.appendChild(meteor);

const startButton = document.createElement('div');
startButton.classList.add('button');
startButton.innerText = "START";
startButton.addEventListener('click', () => {
    window.changeScreen('gameBoardUI');
    window.gameState = new Game();
    window.gameState.start();
})

const instructions = document.createElement('div');
instructions.classList.add('instructions');
instructions.classList.add('hidden');
instructions.innerHTML = `<ul><li>A barrage of meteors is headed right towards Earth! Grab your trusty keyboard-aimed laser and blast them before certain doom!</li>

<li>Type to destroy falling meteors and stars before they reach the bottom line.</li>

<li>Different objects have different fall speeds. Some might even spawn more after being destroyed!</li>

<li>Finish what you start! You can't change targets until they're destroyed.</li></ul>`

const howToPlay = document.createElement('div');
howToPlay.classList.add('button');
howToPlay.innerText = "HOW TO PLAY";
howToPlay.addEventListener('mouseover',() => {instructions.classList.remove('hidden')});
howToPlay.addEventListener('mouseout',() => {instructions.classList.add('hidden')});

startUI.append(title, startImage, startButton,instructions,howToPlay);

//Win screen
const winUI = document.createElement('div');
winUI.id = "winUI";
const winMessage = document.createElement('h1');
winMessage.innerText = "CRISIS AVERTED";
winUI.appendChild(winMessage);

const winImage = document.createElement('div');
winImage.classList.add('ui-image');
winImage.appendChild(newEarth());
winUI.appendChild(winImage);

const winReturnButton = document.createElement('div');
winReturnButton.classList.add('button');
winReturnButton.innerText = "BACK TO MAIN MENU";
winReturnButton.addEventListener('click', () => {
    window.changeScreen('startUI');
})
winUI.appendChild(winReturnButton);


//Lose screen
const loseUI = document.createElement('div');
loseUI.id = "loseUI";
const loseMessage = document.createElement('h1');
loseMessage.innerText = "WELL...";
loseUI.appendChild(loseMessage);

const loseImage = document.createElement('div');
loseImage.classList.add('ui-image');

const explosion = document.createElement('div');
explosion.classList.add('explosion');
explosion.innerText = String.fromCodePoint(0X1F4A5);
loseImage.appendChild(newEarth());
loseImage.appendChild(explosion);
loseUI.appendChild(loseImage);

const loseReturnButton = document.createElement('div');
loseReturnButton.classList.add('button');
loseReturnButton.innerText = "...try again?";
loseReturnButton.addEventListener('click', () => {
    window.changeScreen('startUI');
})
loseUI.appendChild(loseReturnButton);


// UI manipulation: gameBoard is the main area where animations occur during the game
const gameBoardUI = document.createElement('div');
gameBoardUI.id = "gameBoardUI";

const screens: Record<string,HTMLDivElement> = {
    startUI: startUI,
    winUI: winUI,
    loseUI: loseUI,
    gameBoardUI: gameBoardUI
}

// changing screens
window.changeScreen = function (screenName: string) {
    for (let screen in screens) {
        if (screens[screen].parentElement === document.body) {
            document.body.removeChild(screens[screen]);
        }
    }
    document.body.appendChild(screens[screenName]);
}

window.changeScreen('startUI');

