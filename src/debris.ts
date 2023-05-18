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


export default class Debris {
  id: string;
  height: number;
  speed: number;
  word: string;
  remaining: string[];
  uiElement: HTMLDivElement;
  uiLabel: HTMLDivElement;
  collided: Boolean;

  constructor(id: number = 1, minLength: number = 4, maxLength: number = minLength) {
    this.collided = false;
    this.id = "debris" + String(id).padStart(4, '0');
    console.log(`Debris ${this.id} created`);
    this.height = 600;
    this.speed = 60;
    this.word = generateWord(minLength, maxLength);
    this.remaining = this.word.split('');
    // parent container to control movement and size of the debris.
    this.uiElement = document.createElement('div');
    this.uiElement.classList.add('debris-container');
    this.uiElement.classList.add('disable-select');
    this.setHeight();
    this.uiElement.id = this.id;
    // labels indicate the word the player has to type to destroy the debris.
    this.uiLabel = document.createElement('div');
    this.uiLabel.classList.add('debris-label');
    this.uiLabel.innerText = this.word;
    // image for the visual representation of the debris.
    const image = document.createElement('div');
    image.classList.add('debris-sprite');
    image.classList.add('spinning');
    image.innerText = String.fromCodePoint(0x1F311);
    this.uiElement.appendChild(image);
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
    this.uiElement.parentElement?.removeChild(this.uiElement);
    window.gameState.activeDebris.splice(window.gameState.activeDebris.indexOf(this), 1);
    delete window.gameState.currentTarget;
  }

  setHeight() {
    this.uiElement.style.top = (600 - this.height) + 'px';
  }

  fall() {
    this.height -= this.speed / 100;
    if (this.height <= 0) {
      this.collided = true;
    }
    this.setHeight();
  }
}