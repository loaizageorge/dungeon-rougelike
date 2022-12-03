import Canvas, { CellTypes } from "./Canvas";
import Enemy from "./Enemy";
import Player, { Coordinate } from "./Player";

class Board {
  player: Player;
  canvas: Canvas;
  enemy: Enemy;

  constructor(canvas: Canvas, player: Player, enemy: Enemy) {
    this.player = player;
    this.canvas = canvas;
    this.enemy = enemy;
  }

  handleKeyPress = (e: { keyCode: number; }): void => {
    const previousCoordinate = this.player.getPosition();
    const updatedCoordinate = this.player.move(e.keyCode);

    /**
     * move possibilities
     * 1. empty square -> update player move
     * 2. enemy -> prevent move, do a damage calculation, update player and enemy HP
     * 3. item -> update player move, remove item,  
     */

    if (updatedCoordinate && this.moveInBounds(updatedCoordinate)) {
      if (this.enemyEncounter(updatedCoordinate, this.enemy)) {
        console.log('attack!');
        
      } else {
        this.player.setPosition(updatedCoordinate);
        this.canvas.placeOnBoard(updatedCoordinate, CellTypes.HERO);
        this.canvas.removeFromBoard(previousCoordinate);
      }
    }
  }

  // TODO: vertical bound and horizonal bounds defined by canvas H*W
  moveInBounds(coordinate: Coordinate): boolean {
    return this.inVerticalBounds(coordinate.y) && this.inHoriziontalBounds(coordinate.x);
  }

  enemyEncounter(playerPosition: Coordinate, enemy: Enemy): boolean {
    const enemyPosition = enemy.getPosition();
    return playerPosition.x == enemyPosition.x && playerPosition.y === enemyPosition.y;
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