// https://codingwithmanny.medium.com/quick-jest-setup-with-vitejs-react-typescript-82f325e4323f

import Player from './Player';

test("Player can move", () => {
  const player = new Player({x: 0, y:0});

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