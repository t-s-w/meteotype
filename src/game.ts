import Debris from './debris.ts';

export default class Game {
    activeDebris: Debris[];
    currentTarget: Debris | undefined;
    gameBoard: Element | undefined;
    debrisIndex: number;
    gameTimeHandler: number;


    constructor() {
        this.debrisIndex = 0;
        this.activeDebris = [];
        this.gameBoard = document.querySelector('#gameBoardUI');
        document.addEventListener('keydown', (evt) => this.keyHandler(evt));
        this.gameTimeHandler = 0;
    }

    // keyHandler listens for the keypresses and does one of two things;
    // if there is no current target, search for one that matches the key pressed and target it.
    // if there is a current target, attempt to shoot it (mistakes will simply do nothing, no target switching allowed)

    keyHandler(evt: KeyboardEvent) {
        let key = evt.key;
        if (this.currentTarget === undefined) {
            this.acquireTarget(key);
        } else {
            this.shoot(key);
        }
    }

    shoot(key: String) {
        if (this.currentTarget === undefined) {
            return;
        }
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

    // tick method causes time to pass; debris fall, new debris spawn, difficulty increases over time

    start() {
        if (!this.gameTimeHandler) {
            this.gameTimeHandler = setInterval(() => this.tick(), 10);
        }
    }

    tick() {
        for (let debris of this.activeDebris) {
            debris.fall();
            if (debris.collided) {
                this.triggerFail();
            }
        }
    }

    // lose condition

    triggerFail() {
        console.log('u lose lol');
        for (let debris of this.activeDebris) {
            debris.destroy();
        }
    }

    // debugging method
    debug() {
        let meteo = new Debris(this.debrisIndex)
        this.debrisIndex++;
        meteo.spawn();
    }
}