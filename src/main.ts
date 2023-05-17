import './style.css'
import Debris from './debris.ts'
import Game from './game.ts'

window.gameState = new Game();
const meteor = new Debris();
meteor.spawn();