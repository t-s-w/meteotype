export default class Debris {
  id: string;
  height: number;
  speed: number;
  word: string;
  remaining: string[];

  constructor(id = 1) {
    this.id = "debris" + String(id).padStart(4, '0');
    console.log(`Debris ${this.id} created`);
    this.height = 100;
    this.speed = 5;
    this.word = "excite";
    this.remaining = this.word.split('');
    console.log(this);
  }

  // Behaviour controls for all Debris

  spawn() {
    // parent container to control movement and size of the debris.
    const container = document.createElement('div');
    container.classList.add('debris-container');
    container.classList.add('disable-select')
    container.id = this.id;
    // labels indicate the word the player has to type to destroy the debris.
    const label = document.createElement('div');
    label.classList.add('debris-label');
    label.innerText = this.word;
    // image for the visual representation of the debris.
    const image = document.createElement('div');
    image.classList.add('debris-sprite');
    image.innerText = String.fromCodePoint(0x1F311);
    container.appendChild(image);
    container.appendChild(label);
    document.querySelector('#gameBoardUI')?.appendChild(container);
    window.gameState.activeDebris.push(this);
  }

  strike() {
    this.remaining.shift();
    if (this.remaining.length == 0) {
      this.destroy();
    }
  }

  destroy() {
    let element = document.querySelector('#' + this.id);
    element?.parentElement?.removeChild(element);
    window.gameState.activeDebris.splice(window.gameState.activeDebris.indexOf(this), 1);
    delete window.gameState.currentTarget;
  }

  fall() {
    this.height -= this.speed;
  }
}