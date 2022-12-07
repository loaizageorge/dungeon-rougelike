import Canvas from './Canvas';
import { Coordinate } from './Character';
import Enemy from './Enemy';
import Item from './Item';
import Player from './Player';
import PlayerStats from './PlayerStats';

class Board {
  player: Player;
  canvas: Canvas;
  enemy: Enemy;
  playerStats: PlayerStats;
  items: Item[];

  constructor(
    canvas: Canvas,
    player: Player,
    enemy: Enemy,
    playerStats: PlayerStats,
    items: Item[]
  ) {
    this.player = player;
    this.canvas = canvas;
    this.enemy = enemy;
    this.playerStats = playerStats;
    this.items = items;
  }

  handleKeyPress = (e: { keyCode: number }): void => {
    const previousCoordinate = this.player.getPosition();
    const updatedCoordinate = this.player.move(e.keyCode);

    /**
     * move possibilities
     * 1. empty square -> update player move
     * 2. enemy -> prevent move, do a damage calculation, update player and enemy HP
     * 3. item -> update player move, remove item,
     */

    if (updatedCoordinate && this.moveInBounds(updatedCoordinate)) {
      const itemToPickup = this.itemPickUp(updatedCoordinate, this.items);
      if (this.enemyEncounter(updatedCoordinate, this.enemy)) {
        this.player.battle(this.enemy);
      } else if (itemToPickup) {
        this.player.pickUp(itemToPickup);
        this.canvas.removeFromBoard(itemToPickup.getPosition());
      } else {
        this.player.setPosition(updatedCoordinate);
        this.canvas.placeOnBoard(updatedCoordinate, 'yellow');
        this.canvas.removeFromBoard(previousCoordinate);
      }
      this.playerStats.displayStats(this.player);
    }
  };

  // TODO: vertical bound and horizonal bounds defined by canvas H*W
  moveInBounds(coordinate: Coordinate): boolean {
    return (
      this.inVerticalBounds(coordinate.y) &&
      this.inHoriziontalBounds(coordinate.x)
    );
  }

  itemPickUp(playerPosition: Coordinate, items: Item[]): Item | undefined {
    return items.find((item: Item) => {
      const x = item.getXCoord();
      const y = item.getYCoord();
      if (x === playerPosition.x && y === playerPosition.y) {
        return item;
      }
      return undefined;
    })
  }

  enemyEncounter(playerPosition: Coordinate, enemy: Enemy): boolean {
    const enemyPosition = enemy.getPosition();
    return (
      playerPosition.x == enemyPosition.x &&
      playerPosition.y === enemyPosition.y
    );
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
