import { MAX_BOUNDARY } from '../../Utils/constants';
import GameMap from './GameMap';

test("Player cannot move out of bounds", () => {
  const game = new GameMap([[]]);

  // left bound
  expect(game.isMoveInBounds({x: - 1, y: 0})).toBe(false);

  // up bound
  expect(game.isMoveInBounds({x: 0, y:  -1})).toBe(false);

  // right bound
  expect(game.isMoveInBounds({x: MAX_BOUNDARY, y: 0})).toBe(false);

  // bottom bound
  expect(game.isMoveInBounds({x: 0, y: MAX_BOUNDARY})).toBe(false);
});