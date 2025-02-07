import { useMemo } from 'react';
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

    const sign = useMemo(() => number > 0 ? '+' : '-', [number]);

    const handleChangedInputValue = (e) => {
        const enteredNumber = Math.abs(parseFloat(e.target.value));
        if (enteredNumber > 0) {
            const newNumber = sign === '+' ? enteredNumber : -enteredNumber;
            changeNumber(index, newNumber);
        }
    };

    return (
        <li>
            <select
                value={sign}
                onChange={() => changeSign(index)}
            >
                <option value='+'>+</option>
                <option value='-'>-</option>
            </select>
            <input
                value={Math.abs(number)}
                onChange={e => handleChangedInputValue(e)}
            />
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