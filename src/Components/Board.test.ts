import {testSetup} from './testSetup';

test("Player cannot move out of bounds", () => {
  const board = testSetup({});

  // left bound
  expect(board.moveInBounds(board.player.moveLeft())).toBe(false);

  // up bound
  expect(board.moveInBounds(board.player.moveUp())).toBe(false);

  // right bound
  board.player.setPosition({x: 9, y: 0});
  expect(board.moveInBounds(board.player.moveRight())).toBe(false);

  // bottom bound
  board.player.setPosition({x: 0, y: 9});
  expect(board.moveInBounds(board.player.moveDown())).toBe(false);
});

test("Player can move in bounds", () => {
  const board = testSetup({});
  board.player.setPosition({x: 1, y: 1});

  expect(board.moveInBounds(board.player.moveLeft())).toBe(true);
  expect(board.moveInBounds(board.player.moveUp())).toBe(true);
  expect(board.moveInBounds(board.player.moveRight())).toBe(true);
  expect(board.moveInBounds(board.player.moveDown())).toBe(true);
})

// test("Player can walk over items after pickup", () => {
//   const board = testSetup({});
// })