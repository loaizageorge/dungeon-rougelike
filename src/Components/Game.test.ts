import { generateBoard } from '../Utils/Generator';
import Cell from './Cell';

test("Game contains items, enemies, and the hero", () => {
  const expectedCells = 100;
  let actualCells = 0;
  const generated = generateBoard({length: 10, width: 10});

  generated.map((row: Cell[]) => {
    row.map((cell: Cell) => {
      if (cell instanceof Cell) {
        actualCells++;
      };
    });    
  });

  expect(actualCells).toBe(expectedCells);
  
})