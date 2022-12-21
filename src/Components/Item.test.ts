import { CellTypes } from './Cell';
import Item from './Item';
import { createPlayer } from './testSetup';

test('Attack pickup increases player attack', () => {
  const player = createPlayer({});
  const item = new Item({type: CellTypes.WEAPON, amount: 5, position: {x: 0, y: 0}});
  player.pickUp(item);
  expect(player.getAttack()).toBe(6);
});

test('Health pickup increases player hp',() => {
  const player = createPlayer({});
  const item = new Item({type: CellTypes.POTION, amount: 5, position: {x: 0, y: 0}});
  player.changeHP(10);
  player.pickUp(item);
  expect(player.getHP()).toBe(12);
});