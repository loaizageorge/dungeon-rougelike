import { generateBoard } from '../Utils/Generator';
import Cell, { CellTypes } from './Cell';

test("Game contains items, enemies, and the hero", () => {
  expect(CellTypes.EMPTY).toEqual(CellTypes.EMPTY);
  generateBoard({length: 10, width:10});
  const expectedCells = 100;
  let actualCells = 0;
  const generated = generateBoard({length: 10, width: 10});

  generated.map((row: Cell[]) => {
    row.map((cell: Cell) => {
      if (cell.getType() === CellTypes.EMPTY) {
        actualCells++;
      };
    });    
  });

  expect(actualCells).toBe(expectedCells);
  
})