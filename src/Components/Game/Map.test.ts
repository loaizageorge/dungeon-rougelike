import { generateBoard } from '../../Utils/Generator';
import Character from '../Pieces/Character';
import GameMap from './GameMap';
import { createPlayer } from '../testSetup';

test('Map can take in a generated map', () => {
  const generate = generateBoard({ length: 10, width: 10 });
  const map = new GameMap(generate);
  expect(map.getMap().length).toBe(10);
});

test('Map can add and remove', () => {
  const generate = generateBoard({ length: 10, width: 10 });
  const map = new GameMap(generate);
  const player = createPlayer({});

  const board = map.getMap();
  map.place(player, { x: 2, y: 2 });

  const foundPlayer = board[2][2] instanceof Character;
  expect(foundPlayer).toBe(true);

  map.remove({ x: 2, y: 2 });
  const removedPlayer = board[2][2] instanceof Character;
  expect(removedPlayer).toBe(false);
});
