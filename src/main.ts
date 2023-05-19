import './style.css'
import Debris from './debris.ts'
import Game from './game.ts'

console.log(new Game())

const startUI = document.createElement('div');
startUI.id = "startUI";
const title = document.createElement('h1');
title.innerText = "METEOTYPE";
const startButton = document.createElement('div');
startButton.classList.add('button');
startButton.innerText = "START";
startButton.addEventListener('click', () => {
    changeScreen('gameBoardUI');
    window.gameState = new Game();
    window.gameState.start();
})
startUI.append(title, startButton);


const winUI = document.createElement('div');
winUI.id = "winUI";
const winMessage = document.createElement('h1');
winMessage.innerText = "You Win";
winUI.appendChild(winMessage);
const winReturnButton = document.createElement('div');
winReturnButton.classList.add('button');
winReturnButton.innerText = "BACK TO MAIN MENU";
winReturnButton.addEventListener('click', () => {
    changeScreen('startUI');
})
winUI.appendChild(winReturnButton);

const loseUI = document.createElement('div');
loseUI.id = "loseUI";
const loseMessage = document.createElement('h1');
loseMessage.innerText = "WELL...";
loseUI.appendChild(loseMessage);

const loseImage = document.createElement('div');
loseImage.style.position = 'relative';
const earth = document.createElement('div');
earth.classList.add('lose-image');
earth.innerText = String.fromCodePoint(0x1F30E);
const explosion = document.createElement('div');
explosion.classList.add('explosion');
explosion.innerText = String.fromCodePoint(0X1F4A5);
loseImage.appendChild(earth);
loseImage.appendChild(explosion);
loseUI.appendChild(loseImage);

const loseReturnButton = document.createElement('div');
loseReturnButton.classList.add('button');
loseReturnButton.innerText = "try again?";
loseReturnButton.addEventListener('click', () => {
    changeScreen('startUI');
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

