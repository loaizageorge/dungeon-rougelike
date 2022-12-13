export function addEvent(text: string) {
  const elem = document.getElementById('player-history');

  const newDiv = document.createElement("span");

  // and give it some content
  const newContent = document.createTextNode(text);

  // add the text node to the newly created div
  newDiv.appendChild(newContent);
  elem?.appendChild(newDiv);
  //document.body.insertBefore(newDiv, elem);
}