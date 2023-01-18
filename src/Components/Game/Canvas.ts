import { MAX_BOUNDARY, VISIBILITY } from '../../Utils/constants';
import { Coordinate } from '../Pieces/Character';

// canvas length and width (px)
const WIDTH = 500;
const HEIGHT = 500;

// If we made the canvas bigger or smaller, this should be adjusted as well (px)
const BOX_SIZE = 50;

export default class Canvas {
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }
  drawBlankBoard(): void {
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw Error('Canvas not defined');
    }

    context.clearRect(0, 0, WIDTH, HEIGHT);
  }
  placeOnBoard(position: Coordinate, color: string): void {
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw Error('Canvas not defined');
    }

    const x = this.getMidpoint(position.x);
    const y = this.getMidpoint(position.y);


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

}
