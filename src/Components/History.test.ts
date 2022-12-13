import { addEvent } from "./History";

test("Interaction displays item pickups", () => {
  document.body.innerHTML = `
  <div id='player-history'>
  </div>
  `;

  addEvent("You picked up a potion! Gained 5 HP");
  
  expect(document.getElementById('player-history')?.children[0].innerHTML).toBe('You picked up a potion! Gained 5 HP');
});