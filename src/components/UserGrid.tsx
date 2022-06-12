import { ReactElement, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { GridCell, GridCellProps } from './GridCell';

interface UserGridProps {
  rows: number;
  cols: number;
  heading: string;
  diceValues: number[];
  player: number;
}

type IGridCell = ReactElement<GridCellProps>;

export const UserGrid = (props: UserGridProps) => {
  const { rows, cols, diceValues, player } = props;
  // use a 2d array of GridCell components to render the grid
  const [grid, setGrid] = useState<IGridCell[][]>([]);
  // create a 2d array to map highlighted cells to the correct cell and set it to false
  const [highlighted, setHighlighted] = useState<boolean[][]>([]);

  const handleHighlight = (highlight: boolean, position: string) => {
    const [row, col] = position.split('-').map(Number);
    highlighted[row][col] = highlight;
    setHighlighted([...highlighted]);
    console.log(`handleHighlight: ${highlight} ${position}`);
  };
  // create a 2d array of GridCell components
  const createGrid = () => {
    const grid: IGridCell[][] = [];
    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      highlighted[i] = [];
      for (let j = 0; j < cols; j++) {
        highlighted[i][j] = false;
        grid[i][j] = (
          <GridCell
            key={`${player}-${i}-${j}`}
            cellKey={`${player}-${i}-${j}`}
            diceValues={diceValues}
            highlight={highlighted[i][j]}
            updateHighlight={handleHighlight}
            position={`${i}-${j}`}
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
      console.log('checkWin: checking for win');
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
      alert(`Player ${props.player} wins!`);
    }
  }, [diceValues, grid, props.player]);

  // watch the grid array for changes
  useEffect(() => {
    // console.log('userGrid: grid changed');
  }, [grid]);

  return (
    <>
      <h2>{props.heading}</h2>
      <Table striped bordered hover>
        <tbody>
          {grid.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
