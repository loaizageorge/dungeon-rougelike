import { MAX_BOUNDARY, VISIBILITY } from '../../Utils/constants';
import Cell from '../Pieces/Cell';
import { Coordinate } from '../Pieces/Character';

// canvas length and width (px)
const WIDTH = 1000;
const HEIGHT = 1000;

// If we made the canvas bigger or smaller, this should be adjusted as well (px)
const BOX_SIZE = 100;

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

        const cell = board[y][x];
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

    const x = this.getMidpoint(position.x);
    const y = this.getMidpoint(position.y);
    // const x = position.x;
    // const y = position.y;


    // since we have a transparent png, draw a grass tile and then place the image on top for a nicer look
    if (color === 'potion' || color === 'xattack') {
      context.drawImage(document.getElementById('grass') as HTMLImageElement, x * BOX_SIZE, y * BOX_SIZE, BOX_SIZE, BOX_SIZE)
    }
    context.drawImage(document.getElementById(color) as HTMLImageElement, x * BOX_SIZE, y * BOX_SIZE, BOX_SIZE, BOX_SIZE)
  }

  getMidpoint(position: number) {
    return position + (MAX_BOUNDARY / 2) - VISIBILITY;
  }

  removeFromBoard(position: Coordinate): void {
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw Error('Canvas not defined');
    }
    const x = this.getMidpoint(position.x);
    const y = this.getMidpoint(position.y);
    context.drawImage(document.getElementById('grass') as HTMLImageElement, x * BOX_SIZE, y * BOX_SIZE, BOX_SIZE, BOX_SIZE)
  }

  update(cell: Cell, prevPos: Coordinate, newPos: Coordinate) {
    this.removeFromBoard(prevPos);
    this.placeOnBoard(newPos, cell.getColor());
  }
}
