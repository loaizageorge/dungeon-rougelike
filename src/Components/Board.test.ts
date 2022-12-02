import Player from "./Player";
import Board from "./Board";
import Canvas from "./Canvas";

test("Player cannot move out of bounds", () => {
  const player = new Player({x: 0, y: 0});
  const canvas = new Canvas(document.createElement('canvas'));
  const board = new Board(canvas, player);

  // left bound
  expect(board.moveInBounds(player.moveLeft())).toBe(false);

  // up bound
  expect(board.moveInBounds(player.moveUp())).toBe(false);

  // right bound
  player.setPosition({x: 9, y: 0});
  expect(board.moveInBounds(player.moveRight())).toBe(false);

  // bottom bound
  player.setPosition({x: 0, y: 9});
  expect(board.moveInBounds(player.moveDown())).toBe(false);
});

test("Player can move in bounds", () => {
  const player = new Player({x: 0, y: 0});
  const canvas = new Canvas(document.createElement('canvas'));
  const board = new Board(canvas, player);

  player.setPosition({x: 1, y: 1});
  expect(board.moveInBounds(player.moveLeft())).toBe(true);
  expect(board.moveInBounds(player.moveUp())).toBe(true);
  expect(board.moveInBounds(player.moveRight())).toBe(true);
  expect(board.moveInBounds(player.moveDown())).toBe(true);
})