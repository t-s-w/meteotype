import dictionary from '../data/dictionary' assert { type: 'json' };

// Function to generate a random word from the dictionary data file
// Can specify to generate random word of a range of lengths from minLength to maxLength
// Words are uniformly distributed

const generateWord = function (minLength: number, maxLength: number): string {
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
  return '';
}

// Data for the different kinds of debris such as fall speed, sprite and word lengths they can possibly be

const debrisTypes: Record<number,{minLength:number,maxLength:number,speed:number,image:string,classes:string[]}> = {
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
  },
  4: {
    minLength: 3,
    maxLength: 3,
    speed: 4,
    image: String.fromCodePoint(0x1F31A),
    classes: ['small']
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
  type: number;

  constructor(id: number = 1, type: number = 1) {
    // Default parameters that apply to all Debris.
    this.type = type;
    this.collided = false;
    this.id = "debris" + String(id).padStart(4, '0');
    console.log(`Debris ${this.id} created`);
    this.height = 100;
    this.posX = Math.floor(Math.random() * 80) + 20;
    this.endX = Math.floor(Math.random() * 80) + 20;

    // Type-specific parameters
    let params = debrisTypes[type];
    this.speed = params.speed;
    const word = generateWord(params.minLength, params.maxLength);
    this.word = word;
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

  // A debris may exist but not be on-screen and available to be hit. Spawning makes it available to hit
  spawn() {
    document.querySelector('#gameBoardUI')?.appendChild(this.uiElement);
    window.gameState.activeDebris.push(this);
  }

  // Method to damage the debris and knock a letter off
  strike() {
    this.remaining.shift();
    if (this.remaining.length == 0) {
      this.destroy();
      return;
    }
    this.uiLabel.innerText = this.remaining.join('');
  }

  // Method to display a destruction animation for the debris
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

    if (this.type === 2) {
      let childDebris1 = new Debris(window.gameState.debrisIndex, 4);
      window.gameState.debrisIndex++;
      childDebris1.height = this.height;
      childDebris1.id = this.id + "child1";
      childDebris1.posX = this.posX - 5;
      childDebris1.speedX = -this.speedX;
      let childDebris2 = new Debris(window.gameState.debrisIndex, 4);
      window.gameState.debrisIndex++;
      childDebris2.height = this.height;
      childDebris2.id = this.id + "child1";
      childDebris2.posX = this.posX + 5;
      childDebris2.speedX = this.speedX;
      childDebris1.spawn();
      childDebris2.spawn();
    }
  }

  // Method to set the position of the debris on the DOM
  setPosition() {
    this.uiElement.style.top = (100 - this.height) + '%';
    this.uiElement.style.left = this.posX + "%";
  }

  // Method to be called when time passes, causing the height to decrease and for the DOM element to visually fall
  fall() {
    this.height -= this.speed / 100;
    if (this.height <= 0) {
      this.collided = true;
    }
    this.posX += this.speedX / 100;
    this.setPosition();
  }
}