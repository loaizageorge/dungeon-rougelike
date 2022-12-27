import Cell from './Cell';
import Character, { Coordinate } from './Character';
import Item from './Item';

const WIDTH = 400;
const HEIGHT = 400;
const BOX_SIZE = 40;

export default class Canvas {
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  getCanvas() {
    return this.canvas;
  }

  drawBlankBoard(): void {
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw Error('Canvas not defined');
    }

    context.clearRect(0, 0, WIDTH, HEIGHT);

    context.strokeStyle = 'black';

    for (let x = 0; x <= WIDTH / BOX_SIZE; x++) {
      for (let y = 0; y <= HEIGHT / BOX_SIZE; y++) {
        let xPos = x * BOX_SIZE;
        let yPos = y * BOX_SIZE;
        context.strokeRect(xPos, yPos, BOX_SIZE, BOX_SIZE);
      }
    }
  }

  drawFilledBoard(board: Cell[][]) {
     const context = this.canvas.getContext('2d');
    if (!context) {
      throw Error('Canvas not defined');
    }

    context.clearRect(0, 0, WIDTH, HEIGHT);

    context.strokeStyle = 'black';

    for (let x = 0; x < WIDTH / BOX_SIZE; x++) {
      for (let y = 0; y < HEIGHT / BOX_SIZE; y++) {
        let xPos = x * BOX_SIZE;
        let yPos = y * BOX_SIZE;
        context.strokeRect(xPos, yPos, BOX_SIZE, BOX_SIZE);

        const cell = board[x][y];
        if (cell instanceof Cell) {
          this.placeOnBoard({x, y}, cell.getColor());
        }
      }
    }
  }

  placeOnBoard(position: Coordinate, color: string): void {
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw Error('Canvas not defined');
    }

    context.fillStyle = color
    context.strokeStyle = 'black';
    // context.fillRect(position.x * 40, position.y * 40, BOX_SIZE, BOX_SIZE);
    // context.strokeRect(position.x * 40, position.y * 40, BOX_SIZE, BOX_SIZE);
    context.drawImage(document.getElementById(color) as HTMLImageElement, position.x * 40, position.y * 40, 40, 40)
  }

  removeFromBoard(position: Coordinate): void {
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw Error('Canvas not defined');
    }

    context.fillStyle = 'white';
    context.strokeStyle = 'black';

    context.fillRect(position.x * 40, position.y * 40, BOX_SIZE, BOX_SIZE);
    context.strokeRect(position.x * 40, position.y * 40, BOX_SIZE, BOX_SIZE);
    context.drawImage(document.getElementById('grass') as HTMLImageElement, position.x * 40, position.y * 40, 40, 40)
  }

  update(cell: Cell, prevPos: Coordinate, newPos: Coordinate) {
    this.removeFromBoard(prevPos);
    this.placeOnBoard(newPos, cell.getColor());
  }
}
