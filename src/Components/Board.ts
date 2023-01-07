import { calculateDamage } from '../Utils/StatCalculator';
import Canvas from './Canvas';
import Cell, { CellTypes } from './Cell';
import Character, { Coordinate } from './Character';
import Enemy from './Enemy';
import GameMap from './GameMap';
import { addEvent } from './History';
import Item from './Item';
import Player from './Player';
import PlayerStats from './PlayerStats';

interface BoardProps {
  player: Player;
  canvas: Canvas;
  playerStats: PlayerStats;
  gameMap: GameMap;
}

class Board {
  player: Player;
  canvas: Canvas;
  playerStats: PlayerStats;
  gameMap: GameMap;
  gameOver: boolean;


  constructor({ canvas, player, playerStats, gameMap }: BoardProps) {
    this.player = player;
    this.canvas = canvas;
    this.playerStats = playerStats;
    this.gameMap = gameMap;
    this.gameOver = false;
  }

  setPlayer(player: Player) {
    this.player = player;
  }

  setGameMap(gameMap: GameMap) {
    this.gameMap = gameMap;
  }

  setPlayerStats(playerStats: PlayerStats) {
    this.playerStats = playerStats;
  }

  movePlayer(prevPos: Coordinate, newPos: Coordinate) {
    this.player.setPosition(newPos);
    this.updateBoardAndMap(this.player, prevPos, newPos);
    const visible = this.gameMap.getVisibleMap(newPos);
    
    // TODO: move this into a method
    this.canvas.drawBlankBoard();

    visible.map((row: Cell[], y: number) => {
      row.map((cell: Cell, x: number) => {
        return this.canvas.placeOnBoard({x, y}, cell.getColor());
      })
    })
  }

  handleEnemyDefeated(enemy: Character) {
    this.removeFromBoardAndMap(enemy.getPosition());
  }

  removeFromBoardAndMap(position: Coordinate) {
    this.gameMap.remove(position);
    this.canvas.removeFromBoard(position);
  }

  // update does a move and place on both the board and the map
  updateBoardAndMap(cell: Cell, prevPos: Coordinate, newPos: Coordinate) {
    //this.canvas.update(cell, prevPos, newPos);
    this.gameMap.update(cell, prevPos, newPos);
  }

  handleGameOver() {
    addEvent('Your wounds are too serious and you cannot fight anymore. The will to live leaves your body');
    addEvent('Game over!');
    this.gameOver = true;
  }

  handleBattle(enemy: Enemy) {
    const playerDamageDealt = calculateDamage(this.player.getLevel(), this.player.getAttack());
    const enemyDamageDealt = calculateDamage(enemy.getLevel(), enemy.getAttack());
    addEvent(`You deal ${playerDamageDealt} damage!`)
    addEvent(`Enemy deals ${enemyDamageDealt} damage!`)
    this.player.changeHP(-enemyDamageDealt)
    enemy.changeHP(-playerDamageDealt)
  }

  handleExpGain(enemy: Enemy) {
    addEvent(`Gained ${enemy.getExpGiven()} exp!`);
    this.player.setExperience(this.player.getExperience() + enemy.getExpGiven())
    const leveledUp = this.player.getExperience() > this.player.getExpNeeded();
    if (leveledUp) {
      this.player.levelUp();
      addEvent(`You are now level ${this.player.getLevel()}!`)
    }
  } 

  // TOOD: Simplify even further
  // figure out how to deal with having methods implicity also require a class instance
  handleKeyPress = (e: { keyCode: number }): void|false => {
    if (this.gameOver) {
      return false;
    }
     
    const previousCoordinate = this.player.getPosition();
    const updatedCoordinate = this.player.move(e.keyCode);
    
    const validMove = updatedCoordinate && this.gameMap.isMoveInBounds(updatedCoordinate);

    if (validMove) {
      const cell = this.gameMap.getCell(updatedCoordinate);
      if (cell.getType() === CellTypes.IMPASSABLE) {
        return;
      } else if (cell instanceof Enemy) {
        this.handleBattle(cell);
        
        // GAME OVER
        if (this.player.isDead()) {
         this.handleGameOver();
        // remove enemy from map and board
        // move the player onto that square
        } else if (cell.isDead()) {          
          this.handleExpGain(cell);
          this.removeFromBoardAndMap(cell.getPosition());
          this.movePlayer(previousCoordinate, updatedCoordinate);
        }
      // PICK UP HEALTH / WEAPON  
      } else if (cell instanceof Item ) {
        // apply item buffs to player
        if (cell.getType() === CellTypes.WEAPON) {
          addEvent(`You picked up some spinach! Attack increased by ${cell.getAmount()}!`);
        } else if (cell.getType() === CellTypes.POTION) {
          addEvent(`You picked up a potion! Health restored by ${cell.getAmount() - this.player.getHP()}!`);
        }
        this.player.pickUp(cell);
        this.removeFromBoardAndMap(cell.getPosition());
        this.movePlayer(previousCoordinate, updatedCoordinate);

      // No interactions, just move the player onto the empty square
      } else {
        this.movePlayer(previousCoordinate, updatedCoordinate);
      }
      this.playerStats.displayStats(this.player);
    }
  };

  landOnSquare(position: Coordinate, board: Cell[][]): Cell {
    return board[position.x][position.y];
  }

  itemPickUp(playerPosition: Coordinate, items: Item[]): Item | undefined {
    return items.find((item: Item) => {
      const x = item.getXCoord();
      const y = item.getYCoord();
      if (x === playerPosition.x && y === playerPosition.y) {
        return item;
      }
      return undefined;
    });
  }

  enemyEncounter(playerPosition: Coordinate, enemy: Enemy): boolean {
    const enemyPosition = enemy.getPosition();
    return (
      playerPosition.x == enemyPosition.x &&
      playerPosition.y === enemyPosition.y
    );
  }

  addArrowKeyListener():void {
    document.addEventListener('keydown', (e) => this.handleKeyPress(e), true);
  }

  removeArrowKeyListener():void {
    document.removeEventListener('keydown',(e) => this.handleKeyPress(e), true);
    
  }
}

export default Board;
