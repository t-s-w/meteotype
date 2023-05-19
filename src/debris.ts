import dictionary from '../data/dictionary.json' assert { type: 'json' };

const generateWord = function (minLength: number, maxLength: number) {
  let totalLength = 0;
  for (let i = minLength; i <= maxLength; i++) {
    totalLength += dictionary[String(i)].length;
  }
  let selection = Math.floor(Math.random() * totalLength);
  for (let i = minLength; i <= maxLength; i++) {
    let skipover = dictionary[String(i)].length;
    if (selection >= skipover) {
      selection -= skipover;
    } else {
      return dictionary[String(i)][selection]
    }
  }
}

const debrisTypes = {
  1: {
    minLength: 5,
    maxLength: 6,
    speed: 10,
    image: String.fromCodePoint(0x1F311),
    classes: ['spinning']
  },
  2: {
    minLength: 9,
    maxLength: 11,
    speed: 4,
    image: String.fromCodePoint(0x1F31D),
    classes: ['large']
  },
  3: {
    minLength: 3,
    maxLength: 4,
    speed: 30,
    image: String.fromCodePoint(0x1F320),
    classes: ['shootingstar']
  }
}

const explode = String.fromCodePoint(0X1F4A5);


export default class Debris {
  id: string;
  height: number;
  speed: number;
  word: string;
  remaining: string[];
  uiElement: HTMLDivElement;
  uiLabel: HTMLDivElement;
  collided: Boolean;
  posX: number;
  endX: number;
  speedX: number;
  image: HTMLDivElement;

  constructor(id: number = 1, type: number = 1) {
    // Default parameters that apply to all Debris.
    this.collided = false;
    this.id = "debris" + String(id).padStart(4, '0');
    console.log(`Debris ${this.id} created`);
    this.height = 100;
    this.posX = Math.floor(Math.random() * 80) + 20;
    this.endX = Math.floor(Math.random() * 80) + 20;

    // Type-specific parameters
    let params = debrisTypes[type];
    this.speed = params.speed;
    this.word = generateWord(params.minLength, params.maxLength);
    this.remaining = this.word.split('');
    this.speedX = (this.endX - this.posX) / (this.height / this.speed)

    // image for the visual representation of the debris.
    this.image = document.createElement('div');
    this.image.classList.add('debris-sprite');
    for (let cls of params.classes) {
      this.image.classList.add(cls);
    }
    this.image.innerText = params.image;

    // HTML Elements involved
    // parent container to control movement and size of the debris.
    this.uiElement = document.createElement('div');
    this.uiElement.classList.add('debris-container');
    this.uiElement.classList.add('disable-select');
    this.setPosition();
    this.uiElement.id = this.id;
    // labels indicate the word the player has to type to destroy the debris.
    this.uiLabel = document.createElement('div');
    this.uiLabel.classList.add('debris-label');
    this.uiLabel.innerText = this.word;
    this.uiElement.appendChild(this.image);
    this.uiElement.appendChild(this.uiLabel);
  }

  // Behaviour controls for all Debris

  spawn() {
    document.querySelector('#gameBoardUI')?.appendChild(this.uiElement);
    window.gameState.activeDebris.push(this);
  }

  strike() {
    this.remaining.shift();
    if (this.remaining.length == 0) {
      this.destroy();
      return;
    }
    this.uiLabel.innerText = this.remaining.join('');
  }

  destroy() {
    this.uiElement.removeChild(this.uiLabel);
    this.image.innerText = explode;
    if (this.uiElement.querySelector('table')) {
      let reticle = this.uiElement.querySelector('table');
      reticle?.parentElement?.removeChild(reticle);
    }
    this.image.classList.add('fadeout');
    window.gameState.activeDebris.splice(window.gameState.activeDebris.indexOf(this), 1);
    delete window.gameState.currentTarget;

    setTimeout(() => this.uiElement.parentElement?.removeChild(this.uiElement), 1000);
  }

  setPosition() {
    this.uiElement.style.top = (100 - this.height) + '%';
    this.uiElement.style.left = this.posX + "%";
  }

  fall() {
    this.height -= this.speed / 100;
    if (this.height <= 0) {
      this.collided = true;
    }
    this.posX += this.speedX / 100;
    this.setPosition();
  }
}