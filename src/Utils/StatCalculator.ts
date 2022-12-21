/**
 * https://bulbapedia.bulbagarden.net/wiki/Damage
 * Using Gen 1 to keep it simple
 */
export function calculateDamange(lvl: number, base: number) {
  const calc = ((((2 * lvl) / 5 + 2) * base) / 50 + 2) * calculateRandom();
  return Math.round(calc);
}

export function calculateRandom() {
  return (Math.random() * (255 - 217) + 217) / 255;
}

/**
 * Attack and HP at a given level
 * https://www.gamerguides.com/pokemon-lets-go-pikachu-and-lets-go-eevee/guide/advanced-trainer-info/understanding-stats/how-to-calculate-stats
 */
// export function calculateAttack(lvl: number, base: number) {
//   return (2 * base * lvl) / 100 + 5;
// }

export function calculateHP(lvl: number, base: number) {
  return Math.round((2 * base * lvl) / 100 + lvl + 10);
}

/**
 * Using medium fast (n^3)
 * https://bulbapedia.bulbagarden.net/wiki/Experience#Experience_at_each_level
 */
export function calculateExpNeeded(level: number) {
  return level * level * level;
}

/**
 * This is super simplified
 * https://bulbapedia.bulbagarden.net/wiki/Experience#Experience_at_each_level
 */
export function calculateExpGiven(level: number) {
  return (45 * level) / 7;
}
