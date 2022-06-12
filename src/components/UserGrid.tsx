import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { GridCell } from './GridCell';

interface UserGridProps {
  rows: number;
  cols: number;
  heading: string;
  diceValues: number[];
  player: number;
}

export const UserGrid = (props: UserGridProps) => {
  const { rows, cols, diceValues } = props;

  // keep an array of numbers in the grid
  const [grid, setGrid] = useState(Array().fill(0));

  // watch the numbers array for changes
  useEffect(() => {
    console.log('userGrid: diceValues changed');
  }, [diceValues]);

  let innerBody: React.ReactElement[] = [];
  const tableInnerBody = (rows: number, cols: number): React.ReactElement[] => {
    let tableInnerBody = [];
    for (let i = 1; i <= rows; i++) {
      tableInnerBody.push(
        <tr key={i + rows}>
          <td key={i}>{i}</td>
          {tableInnerRow(i, cols)}
        </tr>
      );
    }
    return tableInnerBody;
  };

  const tableInnerRow = (
    rowNum: number,
    cols: number
  ): React.ReactElement[] => {
    let tableInnerRow = [];
    for (let i = 1; i <= cols; i++) {
      tableInnerRow.push(
        <GridCell
          key={i}
          value={0}
          cellKey={`${rowNum}${i}`}
          onChange={(value: number) => onAddNumber(value)}
          diceValues={diceValues}
        />
      );
    }
    return tableInnerRow;
  };
  // build the inner body of the table on creation

  const onAddNumber = (value: number) => {
    console.log('UserGrid: onAddNumber');
    // add the number to the numbers array
    setGrid([...grid, value]);
  };

  innerBody = tableInnerBody(rows, cols);

  // return a react-bootstrap grid table with 3 columns and 3 rows, with a border and a cell padding of 10px
  return (
    <>
      <h3>{props.heading}</h3>
      <Table bordered hover>
        <thead>
          <tr key={0}>
            <th>{}</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
          </tr>
        </thead>
        <tbody>{innerBody}</tbody>
      </Table>
    </>
  );
};
