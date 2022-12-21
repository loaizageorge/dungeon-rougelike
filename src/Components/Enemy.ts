import { calculateExpGiven } from '../Utils/StatCalculator';
import Character from './Character';

export default class Enemy extends Character {
  getExpGiven(): number {
    return calculateExpGiven(this.getLevel());
  }
}

