import './style.css'
import Debris from './debris.ts'
import Game from './game.ts'

declare global {
    interface Window { 
        gameState: Game,
    changeScreen: Function }
}

function newEarth() {
    const earth = document.createElement('div');
    earth.classList.add('earth-large');
    earth.innerText = String.fromCodePoint(0x1F30E);
    return earth;
}

function newFallingStar() {
    const fallingStar = document.createElement('div');
    fallingStar.classList.add('falling-star');
    fallingStar.innerText = String.fromCodePoint(0x1F320);
    return fallingStar;
}




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
startUI.append(title, startImage, startButton);


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
loseReturnButton.innerText = "try again?";
loseReturnButton.addEventListener('click', () => {
    window.changeScreen('startUI');
})
loseUI.appendChild(loseReturnButton);



const gameBoardUI = document.createElement('div');
gameBoardUI.id = "gameBoardUI";

const screens = {
    startUI: startUI,
    winUI: winUI,
    loseUI: loseUI,
    gameBoardUI: gameBoardUI
}


window.changeScreen = function (screenName: string) {
    for (let screen in screens) {
        if (screens[screen].parentElement === document.body) {
            document.body.removeChild(screens[screen]);
        }
    }
    document.body.appendChild(screens[screenName]);
}

window.changeScreen('startUI');

