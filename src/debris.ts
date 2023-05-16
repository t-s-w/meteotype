export default class Debris {
  id: number;
  height: number;
  speed: number;
  word: string;
  remaining: string[];

  constructor() {
    this.id = 1;
    this.height = 100;
    this.speed = 5;
    this.word = "excite";
    this.remaining = this.word.split('');
  }

  fall() {
    this.height -= this.speed;
  }

  spawn() {
    const container = document.createElement('div');
    container.classList.add('debris-container');
    const label = document.createElement('div');
    label.classList.add('debris-label');
    label.innerText = this.word;
    container.appendChild(label);
    document.querySelector('#gameBoardUI')?.appendChild(container);
  }
}