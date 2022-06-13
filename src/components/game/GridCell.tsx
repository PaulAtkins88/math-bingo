import { useEffect, useState } from 'react';

// an editable grid cell for placing a number in a grid
export interface GridCellProps {
  cellKey: string;
  diceValues: number[];
  highlight: boolean;
  position: string;
  totalDice: number;
  updateHighlight: (highlight: boolean, position: string) => void;
}

export const GridCell = (props: GridCellProps) => {
  const { cellKey, diceValues, position, totalDice, updateHighlight } = props;
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(0);
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    if (diceValues.includes(value)) {
      setHighlighted(true);
      updateHighlight(true, position);
    }
  }, [diceValues, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape' || e.key === 'Tab') {
      setEditing(false);
    }
  };

  const handleClick = () => {
    setEditing(true);
    // change dom focus to the input select the input to edit the value
    const input = document.getElementById(`grid-cell-${cellKey}`);
    if (input) {
      input.focus();
    }
  };

  return (
    <>
      {editing ? (
        <input
          type='number'
          onChange={handleChange}
          value={value}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          style={{ width: '100%', textAlign: 'center' }}
          min={totalDice}
          // set the maximum number of input to the total number of dice times 6
          max={totalDice * 6}
        />
      ) : (
        <span
          key={cellKey}
          id={`grid-cell-${cellKey}`}
          onClick={handleClick}
          onBlur={handleBlur}
          style={{
            width: '100%',
            textAlign: 'center',
            cursor: 'hand',
            justifyItems: 'center',
            backgroundColor: highlighted ? '#ffc0cb' : '#ffffff',
          }}
        >
          {value}
        </span>
      )}
    </>
  );
};
