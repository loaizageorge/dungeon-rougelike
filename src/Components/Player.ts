import { CellTypes } from './Canvas';
import Character from './Character';
import Item from './Item';

class Player extends Character {
  pickUp(item: Item) {
    switch (item.getType()) {
      case CellTypes.ATTACK:
        this.setAttack(this.getAttack() + item.getAmount());
        break;
      case CellTypes.HEALTH:
        this.setHP(this.getHP() + item.getAmount());
        break;
      default:
        throw new Error('A player can only pick up attack or health');
    }
  }
}

export default Player;
