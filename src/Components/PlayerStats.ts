import Player from "./Player";

export default class PlayerStats {
  displayStats(player: Player) {
    const hpDisplay = document.getElementById("player-health") as Element;
    hpDisplay.innerHTML = `HP: ${player.getHP()}`;

    const attackDisplay = document.getElementById("player-attack") as Element;
    attackDisplay.innerHTML = `Attack: ${player.getAttack()}`;
  }

}