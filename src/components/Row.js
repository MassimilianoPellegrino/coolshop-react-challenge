import { useState } from 'react';
import './Row.css';

function Row({
    index,
    number,
    enabled,
    changeSign,
    changeNumber,
    changeEnablement,
    deleteRow
}) {

    const [selectedSign, setSelectedSign] = useState(number >= 0 ? '+' : '-');
    const [currentNumber, setCurrentNumber] = useState(number);

    return (
        <li>
            <select value={selectedSign} onChange={(e) => {
                setSelectedSign(e.target.value);
                const reversed = (number > 0 && e.target.value === '-') || (number < 0 && e.target.value === '+');
                if (reversed)
                    changeSign(index);
            }}>
                <option value='+'>+</option>
                <option value='-'>-</option>
            </select>
            <input type="number" value={Math.abs(currentNumber)} onChange={(e) => {
                if (e.target.value > 0) {
                    setCurrentNumber(e.target.value);
                    const newNumber = selectedSign > 0 ? parseFloat(e.target.value) : -parseFloat(e.target.value);
                    changeNumber(index, newNumber);
                }
            }} />
            <button onClick={() => deleteRow(index)}>
                Delete
            </button>
            <button onClick={() => changeEnablement(index)}>
                {enabled ? 'Disable' : 'Enable'}
            </button>
        </li>
    );
}

export default Row;