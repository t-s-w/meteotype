import Debris from './debris.ts';

export default class Game {
    activeDebris: Object;
    currentTarget: Debris | undefined;
    gameBoard: Object;


    constructor() {
        this.activeDebris = [];
        this.gameBoard = document.querySelector('#gameBoardUI');
        document.addEventListener('keydown', (evt: Event) => this.shoot(evt));
    }

    shoot(evt: Event) {
        if (this.currentTarget.remaining[0] === evt.key) {
            this.currentTarget?.strike();
        }
    }
}