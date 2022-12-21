import { createPlayer } from './testSetup';
import PlayerStats from "./PlayerStats";

test("UI shows players stats", () => {
  document.body.innerHTML = `
  <div id='player-stats'>
    <span id='player-health'></span>
    <span id='player-level'></span>
    <span id='player-experience'></span>
  </div>
  `;

  const player = createPlayer({attack: 5});
  const stats = new PlayerStats();
  stats.displayStats(player);
  expect(document.getElementById('player-level')?.innerHTML).toBe('Lvl: 1');
});  