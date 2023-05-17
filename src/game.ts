import Debris from './debris.ts';

export default class Game {
    activeDebris: Debris[];
    currentTarget: Debris | undefined;
    gameBoard: Object;


    constructor() {
        this.activeDebris = [];
        this.gameBoard = document.querySelector('#gameBoardUI');
        document.addEventListener('keydown', (evt: Event) => this.keyHandler(evt));
    }

    shoot(key: String) {
        if (this.currentTarget.remaining[0] === key) {
            this.currentTarget?.strike();
        }
    }

    acquireTarget(key: String) {
        for (let debris of this.activeDebris) {
            if (debris.remaining[0] === key) {
                debris.strike();
                this.currentTarget = debris;
            }
        }
    }

    keyHandler(evt: Event) {
        let key = evt.key;
        if (this.currentTarget === undefined) {
            this.acquireTarget(key);
        } else {
            this.shoot(key);
        }
    }
}