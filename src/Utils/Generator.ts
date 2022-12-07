import Cell, { CellTypes } from "../Components/Cell";

export const generateMap = ({length, width}: {length: number, width: number}): Cell[][] => {
  let map = [];
  let i = 0;
  while (i < length) {
    let row = [];
    let j = 0;
    
    while (j < width) { 
      const coor = {x: i, y: j};
      const cell = new Cell({position: coor, type: CellTypes.EMPTY});
      row.push(cell);
      j++;
    }
    map.push(row);
    i++;
  }
  return map;
}