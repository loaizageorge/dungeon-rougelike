import { calculateDamage } from '../../Utils/StatCalculator';
import { Coordinate } from '../Pieces/Character';
import Canvas from './Canvas';
import Cell, { CellTypes } from '../Pieces/Cell';
import Enemy from '../Pieces/Enemy';
import GameMap from './GameMap';
import { addEvent } from '../Display/History';
import Item from '../Pieces/Item';
import Player from '../Pieces/Player';
import PlayerStats from '../Display/PlayerStats';
import { showGameOverModal, showYouWinModal } from '../Display/Modal';

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

    this.canvas.drawBlankBoard();
    visible.map((row: Cell[], y: number) => {
      row.map((cell: Cell, x: number) => {
        return this.canvas.placeOnBoard({x, y}, cell.getIcon());
      })
    })
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
    addEvent('Game over!');
    addEvent('Your wounds are too serious and you cannot fight anymore. The will to live leaves your body');
    
    showGameOverModal()
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
  // figure out how to deal with having methods implicit also require a class instance
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

          if (cell.getType() === CellTypes.BOSS) {
            showYouWinModal();
          }
        }
      // PICK UP HEALTH / WEAPON  
      } else if (cell instanceof Item ) {
        // apply item buffs to player
        if (cell.getType() === CellTypes.WEAPON) {
          addEvent(`You picked up a x-attack! Attack increased by ${cell.getAmount()}!`);
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
  addArrowKeyListener():void {
    document.addEventListener('keydown', (e) => this.handleKeyPress(e), true);
  }
}

export default Board;
