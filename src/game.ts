import Debris from './debris.ts';

export default class Game {
    activeDebris: Debris[];
    currentTarget: Debris | undefined;
    gameBoard: Object;
    debrisIndex: number;


    constructor() {
        this.debrisIndex = 0;
        this.activeDebris = [];
        this.gameBoard = document.querySelector('#gameBoardUI');
        document.addEventListener('keydown', (evt: Event) => this.keyHandler(evt));
    }

    // keyHandler listens for the keypresses and does one of two things;
    // if there is no current target, search for one that matches the key pressed and target it.
    // if there is a current target, attempt to shoot it (mistakes will simply do nothing, no target switching allowed)

    keyHandler(evt: Event) {
        let key = evt.key;
        if (this.currentTarget === undefined) {
            this.acquireTarget(key);
        } else {
            this.shoot(key);
        }
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
                return;
            }
        }
    }

}