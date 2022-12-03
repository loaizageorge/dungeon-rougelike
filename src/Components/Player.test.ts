// https://codingwithmanny.medium.com/quick-jest-setup-with-vitejs-react-typescript-82f325e4323f

import { CellTypes } from './Canvas';
import Player from './Player';

test("Player can move", () => {
  const player = new Player({
    position: {x: 0, y: 0},
    health: 10,
    attack: 1,
    type: CellTypes.HERO
  });

  player.setPosition(player.moveDown());
  expect(player.getXCoord()).toBe(0);
  expect(player.getYCoord()).toBe(1);

  player.setPosition(player.moveRight())
  expect(player.getXCoord()).toBe(1);
  expect(player.getYCoord()).toBe(1);

  player.setPosition(player.moveUp());
  expect(player.getXCoord()).toBe(1);
  expect(player.getYCoord()).toBe(0);

  player.setPosition(player.moveLeft());
  expect(player.getXCoord()).toBe(0);
  expect(player.getYCoord()).toBe(0);
});

test("Player can gain health", () => {
  const player = new Player({
    position: {x: 0, y: 0},
    health: 10,
    attack: 1,
    type: CellTypes.HERO
  });
  player.changeHP(5);
  expect(player.getHP()).toBe(15);
})

test("Player can lose health", () => {
  const player = new Player({
    position: {x: 0, y: 0},
    health: 10,
    attack: 1,
    type: CellTypes.HERO
  });
  player.changeHP(-5);
  expect(player.getHP()).toBe(5);
})

test("Player can die", () => {
  const player = new Player({
    position: {x: 0, y: 0},
    health: 10,
    attack: 1,
    type: CellTypes.HERO
  });
  player.changeHP(-10);
  expect(player.getHP()).toBe(0);
  expect(player.dead()).toBe(true);
})

test("Player can attack enemy", () => {
  const player = new Player({
    position: {x: 0, y: 0},
    health: 10,
    attack: 5,
    type: CellTypes.HERO
  });
  const enemy = new Player({
    position: {x: 0, y: 0},
    health: 10,
    attack: 1,
    type: CellTypes.ENEMY
  });

  player.battle(enemy);
  expect(enemy.getHP()).toBe(5);
})

test("Player can be attacked", () => {
  const player = new Player({
    position: {x: 0, y: 0},
    health: 10,
    attack: 1,
    type: CellTypes.HERO
  });
  const enemy = new Player({
    position: {x: 0, y: 0},
    health: 10,
    attack: 1,
    type: CellTypes.ENEMY
  });

  enemy.battle(player)
  expect(player.getHP()).toBe(9);
})