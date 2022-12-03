import { CellTypes } from "./Canvas";
import Player from "./Player";
import PlayerStats from "./PlayerStats";

test("UI shows players stats", () => {
  document.body.innerHTML = `
  <div id="player-stats">
    <span id="player-health"></span>
    <span id="player-attack"></span>
  </div>
  `;

  const player = new Player({
    position: {x: 0, y: 0},
    health: 10,
    attack: 5,
    type: CellTypes.HERO
  });
  const stats = new PlayerStats();
  stats.displayStats(player);
  expect(document.getElementById('player-health')?.innerHTML).toBe('HP: 10');
  expect(document.getElementById('player-attack')?.innerHTML).toBe('Attack: 5');
});  