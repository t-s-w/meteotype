import './style.css'
import Debris from './debris.ts'
import Game from './game.ts'

window.gameState = new Game();

const startUI = document.createElement('div');
startUI.id = "startUI";
const title = document.createElement('h1');
title.innerText = "METEOTYPE";
const startButton = document.createElement('div');
startButton.classList.add('button');
startButton.innerText = "START";
startButton.addEventListener('click', () => {
    changeScreen(gameBoardUI);
    window.gameState = new Game();
    window.gameState.start();
})
startUI.append(title, startButton);


const winUI = document.createElement('div');
winUI.id = "winUI";
const winMessage = document.createElement('h1');
winMessage.innerText = "You Win";
winUI.appendChild(winMessage);

const loseUI = document.createElement('div');
loseUI.id = "loseUI";
const loseMessage = document.createElement('h1');
loseMessage.innerText = "You Lost";
loseUI.appendChild(loseMessage);

const gameBoardUI = document.createElement('div');
gameBoardUI.id = "gameBoardUI";

const screens = [startUI, winUI, loseUI, gameBoardUI]


function changeScreen(screenName: HTMLDivElement) {
    for (let screen of screens) {
        if (screen.parentElement === document.body) {
            document.body.removeChild(screen);
        }
    }
    document.body.appendChild(screenName);
}

changeScreen(startUI);

