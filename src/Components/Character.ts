import Cell, { CellTypes } from './Cell';

export type Coordinate = { x: number; y: number };

interface Attributes {
  position: Coordinate,
  health: number,
  attack: number,
  type: CellTypes
}

class Character extends Cell{
  declare position: Coordinate;
  declare type: CellTypes;
  health: number;
  attack: number;

  constructor({position, health, attack, type}: Attributes) {
    super({position, type});
    this.health = health;
    this.attack = attack;
  }

  move(keyCode: number): Coordinate | false {
    //const arrowKeys = [37, 38, 39, 40];
    switch (keyCode) {
      case 37:
        return this.moveLeft();

      case 38:
        return this.moveUp();

      case 39:
        return this.moveRight();

      case 40:
        return this.moveDown();
        
      default:
        return false;
    }
  };

  moveLeft(): Coordinate {
    return {x: this.getXCoord() -1, y: this.getYCoord()};
  }

  moveRight(): Coordinate {
    return  {x: this.getXCoord() + 1, y: this.getYCoord()};
  }

  moveDown(): Coordinate {
    return {x: this.getXCoord(), y: this.getYCoord() + 1};
  }

  moveUp(): Coordinate {
    return {x: this.getXCoord(), y: this.getYCoord() - 1};
  }

  /* GETTERS & SETTERS */

  // attack
  getAttack(): number {
    return this.attack;
  }

  setAttack(attack: number) {
    this.attack = attack;
  }


  // Health
  getHP(): number {
    return this.health;
  }

  setHP(hp: number) {
    return this.health = hp;
  }

  changeHP(hpModifier: number) {
    this.setHP(this.getHP() + hpModifier);
  }
  
  // Status
  isDead(): boolean {
    return this.getHP() <= 0;
  }

  // actions
  battle(enemy: Character): void {
    this.dealDamange(enemy);
    enemy.dealDamange(this);
  }

  dealDamange(enemy: Character): void { 
    this.changeHP(enemy.getAttack() * -1);
    // if (enemy.getAttack() >= this.getHP()) {
    //   this.changeHP(0);
    // } else {
    //   this.changeHP(enemy.getAttack() * -1);
    // }
  }
}

export default Character;