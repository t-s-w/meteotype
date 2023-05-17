import './style.css'
import Debris from './debris.ts'
import Game from './game.ts'

window.gameState = new Game();
const meteor = new Debris();
const meteor2 = new Debris();
const meteor3 = new Debris();
meteor.spawn();
meteor2.spawn();
meteor3.spawn();