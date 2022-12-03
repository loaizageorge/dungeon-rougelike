import Player from "./Player";
import Board from "./Board";
import Canvas, { CellTypes } from "./Canvas";
import Enemy from "./Enemy";
import PlayerStats from "./PlayerStats";

test("Player cannot move out of bounds", () => {
  const player = new Player({
  position: {x: 0, y: 0},
  health: 10,
  attack: 1,
  type: CellTypes.HERO
});
  const enemy = new Enemy({
    position: {x: 1, y: 1},
    health: 10,
    attack: 1,
    type: CellTypes.ENEMY
  });
  const canvas = new Canvas(document.createElement('canvas'));
  const playerStats = new PlayerStats();
  const board = new Board(canvas, player, enemy, playerStats);

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
  const player = new Player({
  position: {x: 0, y: 0},
  health: 10,
  attack: 1,
  type: CellTypes.HERO
});
  const canvas = new Canvas(document.createElement('canvas'));
  const enemy = new Enemy({
    position: {x: 0, y: 1},
    health: 10,
    attack: 1,
    type: CellTypes.ENEMY
  });
  const playerStats = new PlayerStats();
  const board = new Board(canvas, player, enemy, playerStats);

  player.setPosition({x: 1, y: 1});
  expect(board.moveInBounds(player.moveLeft())).toBe(true);
  expect(board.moveInBounds(player.moveUp())).toBe(true);
  expect(board.moveInBounds(player.moveRight())).toBe(true);
  expect(board.moveInBounds(player.moveDown())).toBe(true);
})

// test("Player can attack enemies", () => {
//   const player = new Player({
//     position: {x: 0, y: 0},
//     health: 10,
//     attack: 1,
//     type: CellTypes.HERO
//     });
  
//     const enemy = new Enemy({
//       position: {x: 0, y: 1},
//       health: 10,
//       attack: 1,
//       type: CellTypes.ENEMY
//     });
//     const canvas = new Canvas(document.createElement('canvas'));
//     const board = new Board(canvas, player, enemy);


// })