import { calculateExpNeeded, calculateHP } from '../../Utils/StatCalculator';
import { CellTypes } from './Cell';
import Character from './Character';
import Item from './Item';

class Player extends Character {
  getExpNeeded(): number {
    return calculateExpNeeded(this.getLevel() + 1)
  }

  getMaxHP(): number {
    return calculateHP(this.getLevel(), 50)
  }

  // increase level and also recalculate HP for new level
  levelUp() {
    const xpNeeded = this.getExpNeeded();
    this.setLevel(this.getLevel() + 1);
    this.setExperience(this.getExperience() - xpNeeded);
    this.setHP(calculateHP(this.getLevel(), 50));
  }

  pickUp(item: Item) {
    switch (item.getType()) {
      case CellTypes.WEAPON:
        this.setAttack(this.getAttack() + item.getAmount());
        break;
      case CellTypes.POTION:
        const newHP = this.getHP() + item.getAmount();
        if (newHP > this.getMaxHP()) {
          this.setHP(this.getMaxHP());
        } else {
          this.setHP(newHP);
        }
        break;
      default:
        throw new Error('A player can only pick up attack or health');
    }
  }
}

export default Player;
