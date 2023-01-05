import Player from './Player';

export default class PlayerStats {
  displayStats(player: Player) {
    const hpDisplay = document.getElementById('player-health') as Element;

    hpDisplay.innerHTML = `HP: ${player.getHP()} / ${player.getMaxHP()}`;

    const level = document.getElementById('player-level') as Element;
    level.innerHTML = `Lvl: ${player.getLevel()}`;

    const attack = document.getElementById('player-attack') as Element;
    attack.innerHTML = `Atk: ${player.getAttack()}`;

    const exp = document.getElementById('player-experience') as Element;
    exp.innerHTML = `Exp: ${player.getExperience()} / ${player.getExpNeeded()}`;

    const hpBar = document.getElementById('health-bar') as ElementCSSInlineStyle;
    const hpPercent = player.getHP() / player.getMaxHP() * 100;
    console.log(hpPercent);
    
    hpBar.style.width = `${hpPercent}%`
    
    const expBar = document.getElementById('experience-bar') as ElementCSSInlineStyle;
    const expPercent = player.getExperience() / player.getExpNeeded() * 100;
    console.log(expPercent);
    
    expBar.style.width = `${expPercent}%`;;
  }
}
