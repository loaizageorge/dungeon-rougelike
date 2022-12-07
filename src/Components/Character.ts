import { CellTypes } from './Cell';
export type Coordinate = { x: number; y: number };


interface Attributes {
  position: Coordinate,
  health: number,
  attack: number,
  type: CellTypes
}

class Character {
  position: Coordinate;
  health: number;
  type: CellTypes;
  attack: number;

  constructor({position, health, attack, type}: Attributes) {
    this.position  = position;
    this.health = health;
    this.attack = attack;
    this.type = type;
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

  // Position
  getPosition(): Coordinate {
    return this.position;
  }

  setPosition(position: Coordinate): void {
    this.position = position;
  }

  
  getXCoord(): number {
    return this.position.x;
  }

  getYCoord(): number {
    return this.position.y;
  }

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
  dead(): boolean {
    return this.getHP() <= 0;
  }

  // actions
  battle(enemy: Character): void {
    this.dealDamange(enemy);
    enemy.dealDamange(this);
  }

  dealDamange(enemy: Character): void {
    if (enemy.getAttack() > this.getHP()) {
      this.changeHP(0);
    } else {
      this.changeHP(enemy.getAttack() * -1);
    }
  }

  
}

export default Character;