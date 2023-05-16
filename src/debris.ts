export default class Debris {
  id: string;
  height: number;
  speed: number;
  word: string;
  remaining: string[];

  constructor() {
    this.id = "debris" + String(1).padStart(4, '0');
    console.log(`Debris ${this.id} created`);
    this.height = 100;
    this.speed = 5;
    this.word = "excite";
    this.remaining = this.word.split('');
    console.log(this);
  }

  fall() {
    this.height -= this.speed;
  }

  spawn() {
    const container = document.createElement('div');
    container.classList.add('debris-container');
    container.id = this.id;
    container.addEventListener('click', () => this.strike());
    const label = document.createElement('div');
    label.classList.add('debris-label');
    label.innerText = this.word;
    container.appendChild(label);
    document.querySelector('#gameBoardUI')?.appendChild(container);
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
  }
}