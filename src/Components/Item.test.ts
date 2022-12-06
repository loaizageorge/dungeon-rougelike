import { CellTypes } from './Canvas';
import Item from './Item';
import { createPlayer } from './testSetup';

test('Attack pickup increases player attack', () => {
  const player = createPlayer({});
  const item = new Item({type: CellTypes.ATTACK, amount: 5, position: {x: 0, y: 0}});
  player.pickUp(item);
  expect(player.getAttack()).toBe(6);
});

test('Health pickup increases player hp',() => {
  const player = createPlayer({});
  const item = new Item({type: CellTypes.HEALTH, amount: 5, position: {x: 0, y: 0}});
  player.pickUp(item);
  expect(player.getHP()).toBe(15);
});