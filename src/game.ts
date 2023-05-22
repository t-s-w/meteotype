import Debris from './debris.ts';

const waves: {debrisList: number[],delay:number}[] = [
    ({debrisList: [],delay:0}), { debrisList: [1, 1, 1, 1, 1], delay: 1500 }, { debrisList: [1, 1, 1, 2, 1, 1, 1], delay: 1000 }, { debrisList: [1, 3, 1, 3, 1, 3, 1, 3], delay: 1000 }, { debrisList: [1, 2, 2, 3, 1, 3, 3, 2, 3], delay: 1000 }
]

const targetingReticle = document.createElement('table');
targetingReticle.classList.add('reticle');
for (let i = 0; i < 6; i++) {
    let row = document.createElement('tr');
    for (let j = 0; j < 6; j++) {
        let cell = document.createElement('td');
        row.appendChild(cell);
    }
    targetingReticle.appendChild(row);
}


export default class Game {
    activeDebris: Debris[];
    queuedDebris: Debris[];
    currentTarget: Debris | undefined;
    gameBoard: HTMLElement;
    debrisIndex: number;
    gameTimeHandler: number;
    systemMessageTimer: number;
    systemMessageQueue: string[];
    currentWave: number;
    currentWaveSpawnQueue: number;
    maxWaves: number;
    nextWaveWaiting: number;


    constructor() {
        this.debrisIndex = 0;
        this.activeDebris = [];
        this.queuedDebris = [];
        this.currentWave = 0;
        this.maxWaves = waves.length - 1;
        this.gameBoard = <HTMLElement>document.querySelector('#gameBoardUI');
        document.addEventListener('keydown', (evt) => this.keyHandler(evt));
        this.gameTimeHandler = 0;
        this.systemMessageTimer = 0;
        this.systemMessageQueue = [];
        this.nextWaveWaiting = 0;
        this.currentWaveSpawnQueue = 0;
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
                debris.uiElement.appendChild(targetingReticle);
                this.currentTarget = debris;
                return;
            }
        }
    }

    // display system message

    displayMessage(text: string | undefined) {
        if (this.systemMessageTimer > 0 || !text) {
            return;
        }
        let messageUI = <HTMLElement>this.gameBoard?.querySelector('#status');
        if (!messageUI) {
            messageUI = document.createElement('div');
            messageUI.id = 'status';
            messageUI.classList.add('disable-select', 'status-message', 'message-fadein');
        } else {
            messageUI?.classList.remove('message-fadein');
        }
        messageUI.innerText = text;
        messageUI.classList.add('message-fadein');
        this.gameBoard.appendChild(messageUI);
        this.systemMessageTimer = setTimeout(() => {
            this.gameBoard?.removeChild(messageUI);
            this.systemMessageTimer = 0;
        }
            , 1100)
    }

    // tick method causes time to pass; debris fall, new debris spawn

    start() {
        if (!this.gameTimeHandler) {
            this.gameTimeHandler = setInterval(() => this.tick(), 10);
        }
    }

    tick() {
        // If messages are to be displayed, they display before anything else happens
        if (this.systemMessageTimer > 0) {
            return;
        }
        if (this.systemMessageQueue.length > 0) {
            this.displayMessage(this.systemMessageQueue.shift());
            return;
        }

        // If wave not currently in progress, initialise the next one
        if (this.activeDebris.length === 0 && !(this.queuedDebris.length) && !(this.nextWaveWaiting)) {
            if (this.currentWave < this.maxWaves) {
                this.currentWave++;
                this.nextWaveWaiting = setTimeout(() => this.startWave(this.currentWave), 1000)
                return;
            } else {
                this.triggerWin();
            }

        }

        // If there are any active debris, or if there are any queued debris, then a wave is currently in progress. progress that wave
        for (let debris of this.activeDebris) {
            debris.fall();
            if (debris.collided) {
                this.triggerFail();
            }
        }
    }

    stop() {
        clearInterval(this.gameTimeHandler);
        this.gameTimeHandler = 0;
    }

    // Start wave
    // function inputs: array (of types of Debris to spawn), delay (between debris)
    // - display message: Wave (x) Start
    // - wait until message disappears
    // - start() ticking, which will spawn debris in sequence at appropriate times
    // - debris will come from array, which will empty out over time
    // - after array is empty, stop() and make next wave available to start

    startWave(wave: number) {
        this.systemMessageQueue.push(`Wave ${wave} start`);
        for (let debrisType of waves[wave].debrisList) {
            let debris = new Debris(this.debrisIndex, debrisType);
            this.debrisIndex++;
            this.queuedDebris.push(debris);
        }
        // god please let me find a more elegant solution to delaying the wave spawning by 1 second while the wave start message displays
        setTimeout(() => { this.currentWaveSpawnQueue = setInterval(() => this.spawnNextInWave(), waves[wave].delay) }, 1000)
        this.nextWaveWaiting = 0;
    }

    spawnNextInWave() {
        if (this.queuedDebris.length > 0) {
            this.queuedDebris.shift()?.spawn();
        } else {
            clearInterval(this.currentWaveSpawnQueue);
            this.currentWaveSpawnQueue = 0;
        }
    }

    // Win and lose functions; end game, display the winning/losing screens with options to return to main menu

    triggerWin() {
        this.stop();
        this.gameBoard.innerHTML = '';
        console.log('you win!');
        window.changeScreen('winUI');
    }

    triggerFail() {
        this.stop();
        while (this.activeDebris.length > 0) {
            let debris = this.activeDebris[0];
            debris.destroy();
        }
        setTimeout(() => {window.changeScreen('loseUI');this.gameBoard.innerHTML = '';}, 1000);
    }


}