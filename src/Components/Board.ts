import Canvas from "./Canvas";
import Player, { Coordinate } from "./Player";

class Board {
  player: Player;
  canvas: Canvas;

  constructor(canvas: Canvas, player: Player) {
    this.player = player;
    this.canvas = canvas;
  }

  handleKeyPress = (e: { keyCode: number; }): void => {
    const previousCoordinate = this.player.getPosition();
    const updatedCoordinate = this.player.move(e.keyCode);

    if (updatedCoordinate && this.moveInBounds(updatedCoordinate)) {
      this.player.setPosition(updatedCoordinate);
      this.canvas.placeOnBoard(updatedCoordinate);
      this.canvas.removeFromBoard(previousCoordinate);
    }
  }

  // TODO: vertical bound and horizonal bounds defined by canvas H*W
  moveInBounds(coordinate: Coordinate): boolean {
    return this.inVerticalBounds(coordinate.y) && this.inHoriziontalBounds(coordinate.x);
  }

  inVerticalBounds(coordinate: number): boolean {
    return coordinate >= 0 && coordinate < 10;
  }

  inHoriziontalBounds(coordinate: number): boolean {
    return coordinate >= 0 && coordinate < 10;
  }

  addArrowKeyListener(): void {
    document.addEventListener('keydown', this.handleKeyPress);

  }
}

export default Board;