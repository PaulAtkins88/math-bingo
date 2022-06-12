import { useEffect, useState } from 'react';

// an editable grid cell for placing a number in a grid
interface GridCellProps {
  value: number;
  cellKey: string;
  diceValues: number[];
  onChange: (value: number) => void;
}

export const GridCell = (props: GridCellProps) => {
  const { cellKey, diceValues, onChange } = props;
  const [editing, setEditing] = useState(false);
  const [newValue, setNewValue] = useState(0);
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    if (diceValues.includes(newValue)) {
      setHighlighted(true);
    }
  }, [newValue, diceValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(Number(e.target.value));
  };

  const handleBlur = () => {
    setEditing(false);
    onChange(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape' || e.key === 'Tab') {
      setEditing(false);
      onChange(newValue);
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
    <td
      key={cellKey}
      onClick={handleClick}
      style={{ backgroundColor: highlighted ? 'yellow' : 'fff' }}
    >
      {editing ? (
        <input
          type='number'
          value={newValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          style={{ width: '100%', textAlign: 'center' }}
          min={1}
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
          }}
        >
          {newValue}
        </span>
      )}
    </td>
  );
};
