import { ReactElement, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { GridCell, GridCellProps } from './GridCell';

interface UserGridProps {
  rows: number;
  cols: number;
  heading: string;
  diceValues: number[];
  player: number;
  totalDice: number;
  tabIndexCounter: number;
  handleWin: (player: number) => void;
}

type IGridCell = ReactElement<GridCellProps>;

export const UserGrid = (props: UserGridProps) => {
  const {
    rows,
    cols,
    diceValues,
    player,
    totalDice,
    tabIndexCounter,
    handleWin,
  } = props;
  // use a 2d array of GridCell components to render the grid
  const [grid, setGrid] = useState<IGridCell[][]>([]);
  // create a 2d array to map highlighted cells to the correct cell and set it to false
  const [highlighted, setHighlighted] = useState<boolean[][]>([]);

  const handleHighlight = (highlight: boolean, position: string) => {
    const [row, col] = position.split('-').map(Number);
    highlighted[row][col] = highlight;
    setHighlighted([...highlighted]);
  };

  const randomNumberGenerator = () => {
    // generate a random number between the total possible dice values
    const max = totalDice * 6;
    const min = totalDice;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // create a 2d array of GridCell components
  const createGrid = () => {
    const grid: IGridCell[][] = [];
    // keep track of cell values so that no duplicates are generated
    const cellValues: number[] = [];
    let tabIndex = 1;
    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      highlighted[i] = [];
      for (let j = 0; j < cols; j++) {
        // generate a random number between the total possible dice values
        let value = randomNumberGenerator();
        // check if the value is already in the cellValues array
        while (cellValues.includes(value)) {
          value = randomNumberGenerator();
        }
        // add the value to the cellValues array
        cellValues.push(value);

        highlighted[i][j] = false;
        grid[i][j] = (
          <GridCell
            key={`${player}-${i}-${j}`}
            cellKey={`${player}-${i}-${j}`}
            cellValue={value}
            diceValues={diceValues}
            highlight={highlighted[i][j]}
            updateHighlight={handleHighlight}
            position={`${i}-${j}`}
            totalDice={totalDice}
            tabIndex={tabIndex * tabIndexCounter}
          />
        );
      }
    }
    setGrid(grid);
    setHighlighted(highlighted);
  };

  // create a 2d array of GridCell components to render the grid
  useEffect(() => {
    createGrid();
  }, [diceValues]);

  // watch the numbers array for changes
  useEffect(() => {
    // function to check if a user has won
    // a win is when there 3 true values in a row, column or diagonal in the highlighted array
    const checkWin = (): boolean => {
      if (grid.length === 0) {
        return false;
      }

      // check rows
      for (let i = 0; i < grid.length; i++) {
        let row = true;
        for (let j = 0; j < grid[i].length; j++) {
          row = row && highlighted[i][j];
        }
        if (row) {
          return true;
        }
      }
      // check columns
      for (let i = 0; i < grid[0].length; i++) {
        let col = true;
        for (let j = 0; j < grid.length; j++) {
          col = col && highlighted[j][i];
        }
        if (col) {
          return true;
        }
      }
      // check diagonals
      let diag1 = true;
      for (let i = 0; i < grid.length; i++) {
        diag1 = diag1 && highlighted[i][i];
      }
      if (diag1) {
        return true;
      }
      let diag2 = true;
      for (let i = 0; i < grid.length; i++) {
        diag2 = diag2 && highlighted[i][grid.length - 1 - i];
      }
      if (diag2) {
        return true;
      }
      return false;
    };

    // check if a user has won
    if (grid.length > 0 && checkWin()) {
      handleWin(player);
    }
  }, [diceValues, grid, props.player]);

  // watch the grid array for changes
  useEffect(() => {}, [grid]);

  return (
    <>
      <h2>{props.heading}</h2>
      <Table striped bordered hover key={`table-${player}`}>
        <tbody>
          {grid.map((row, i) => (
            <tr key={`row-${i}`}>
              {row.map((cell, j) => {
                return cell;
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
