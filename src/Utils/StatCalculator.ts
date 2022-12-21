/**
 * https://bulbapedia.bulbagarden.net/wiki/Damage
 * Using Gen 1 to keep it simple
 */
export function calculateDamage(lvl: number, base: number) {
  const calc = ((((2 * lvl) / 5 + 2) * base) / 50 + 2) * calculateRandom();
  return Math.round(calc);
}

// introduces a small range (1-2) to the damage calculation
export function calculateRandom() {
  return (Math.random() * (255 - 217) + 217) / 255;
}

/**
 * HP at a given level
 * https://www.gamerguides.com/pokemon-lets-go-pikachu-and-lets-go-eevee/guide/advanced-trainer-info/understanding-stats/how-to-calculate-stats
 */

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
 * Bump up modifier to make the EXP gain faster
 * https://bulbapedia.bulbagarden.net/wiki/Experience#Experience_at_each_level
 */
export function calculateExpGiven(level: number) {
  const modifier = 90;
  return Math.round((modifier * level) / 7);
}
