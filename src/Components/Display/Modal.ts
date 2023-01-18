export function showModal() {
  const modal = document.getElementById('modal') as ElementCSSInlineStyle;
  modal.style.display = 'block';
}

export function hideModal() {
  const modal = document.getElementById('modal') as ElementCSSInlineStyle;
  modal.style.display = 'none';
}

export function showStartingScreen() {
  showModal();
  const modal = document.getElementById('modal-content') as HTMLElement;
  const text =
    'How to play: Use the arrow keys to move Pickachu up, down, left and right.\n' +
    'Pick up potions to restore HP.\n' +
    'Pick up X-Attacks to boost your attack.\n' +
    'Gain experience by battling Rattatas.\n' +
    'Get strong enough to take on the boss Gengar at the end of the map\n' +
    "Restart at any time by pressing the 'Restart Game' button.\n" +
    'The game ends when you lose all your HP or when you take down the boss.\n' +
    'Best of luck!\n' +
    'Legal stuff: Pokemon is the property of Nintendo and this project\n' +
    'is not affiliated with them in any capacity.\n';
  ('Just a personal project built for fun for practice.');
  modal.innerHTML = text;
}

export function showGameOverModal() {
  showModal();
  const modal = document.getElementById('modal-content') as HTMLElement;
  const text = 'Game over!\n' + "Click the 'Restart Game' button to try again.";
  modal.innerHTML = text;
}

export function showYouWinModal() {
  showModal();
  const modal = document.getElementById('modal-content') as HTMLElement;
  const text =
    'You win!\n' +
    'Thanks for playing! ' +
    "Click the 'Restart Game' button to go again.";
    modal.innerHTML = text;
}
