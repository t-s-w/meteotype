import './style.css'
import Debris from './debris.ts'
import Game from './game.ts'

window.gameState = new Game();
const meteor = new Debris(1);
const meteor2 = new Debris(2);
const meteor3 = new Debris(3);
meteor.spawn();
meteor2.spawn();
meteor3.spawn();