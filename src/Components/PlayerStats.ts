import Player from './Player';

export default class PlayerStats {
  displayStats(player: Player) {
    const hpDisplay = document.getElementById('player-health') as Element;

    hpDisplay.innerHTML = `HP: ${player.getHP()} / ${player.getMaxHP()}`;

    const attackDisplay = document.getElementById('player-level') as Element;
    attackDisplay.innerHTML = `Lvl: ${player.getLevel()}`;

    const levelDisplay = document.getElementById('player-experience') as Element;
    levelDisplay.innerHTML = `Exp: ${player.getExperience()} / ${player.getExpNeeded()}`;
  }
}
