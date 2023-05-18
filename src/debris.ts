export default class Debris {
  id: string;
  height: number;
  speed: number;
  word: string;
  remaining: string[];
  uiElement: HTMLDivElement;
  uiLabel: HTMLDivElement;

  constructor(id = 1) {
    this.id = "debris" + String(id).padStart(4, '0');
    console.log(`Debris ${this.id} created`);
    this.height = 100;
    this.speed = 5;
    this.word = "excite";
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
    this.uiElement.style.top = (100 - this.height) + '%';
  }

  fall() {
    this.height -= this.speed;
    this.setHeight();
  }
}