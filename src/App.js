import { useMemo, useState } from 'react';
import './App.css';
import Row from './components/Row';

function App() {

  const [rows, setRows] = useState([
    { number: 1, enabled: true },
    { number: 1, enabled: true },
    { number: -1, enabled: true }
  ]);
  const result = useMemo(() => rows.reduce((partialSum, currentRow) => currentRow.enabled ? partialSum + currentRow.number : partialSum, 0), [rows]);

  const changeSign = (index) => {
    const newRows = [...rows];
    newRows[index].number = -rows[index].number;
    setRows(newRows);
  };

  const changeNumber = (index, newValue) => {
    const newRows = [...rows];
    newRows[index].number = newValue;
    setRows(newRows);
  };

  const changeEnablement = (index) => {
    const newRows = [...rows];
    newRows[index].enabled = !rows[index].enabled;
    setRows(newRows);
  };

  const deleteRow = (index) => {
    const newRows = [...rows].filter((_, i) => i !== index);
    setRows(newRows);
  };

  const addRow = () => {
    const newRows = [...rows];
    newRows.push({
      number: 1,
      enabled: true
    });
    setRows(newRows);
  };

  return (
    <div className="App">
      <div>
        <button onClick={addRow}>
          Add row
        </button>
      </div>
      <ul>
        {rows.map((row, index) =>
          <Row
            key={index}
            index={index}
            number={row.number}
            enabled={row.enabled}
            changeSign={changeSign}
            changeNumber={changeNumber}
            changeEnablement={changeEnablement}
            deleteRow={deleteRow}
          />
        )}
      </ul>
      <div>
        Result: {result}
      </div>
    </div>
  );
}

export default App;
