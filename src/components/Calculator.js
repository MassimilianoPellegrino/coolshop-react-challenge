import { useMemo, useState } from 'react';
import Row from './Row';
import './Calculator.css'
import { Box, IconButton, List, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

/**
 * Main component: it contains the list of rows, the 'Add row' button and the result of the sum.
 */
function Calculator() {

    // state variable that stores the rows currently in the application; each row is an object with two properties: the number, which can be either positive or negative, and a boolean value indicating whether the row should contribute to the total result or not.
    const [rows, setRows] = useState([
        { number: 100, enabled: true },
        { number: 30, enabled: true },
        { number: -7, enabled: true }
    ]);

    /**
     * Calculates the total result by summing up each enabled number in the "rows".
     */
    const calculateResult = () =>
        rows.reduce(
            (partialSum, currentRow) =>
                currentRow.enabled ? partialSum + currentRow.number : partialSum
            , 0);

    /**
     * Calls "calculateResult" every time the "rows" have changed to store and re-render the updated result.
     */
    const result = useMemo(calculateResult, [rows]);

    /**
     * Changes the sign of the row number at the given index. 
     */
    const changeRowSign = (index) => {
        const newRows = [...rows];
        newRows[index].number = -rows[index].number;
        setRows(newRows);
    };

    /**
     * Changes the value of the row at the given index placing the given number.
     */
    const changeRowNumber = (index, newNumber) => {
        const newRows = [...rows];
        newRows[index].number = newNumber;
        setRows(newRows);
    };

    /**
     * Changes the enabled/disabled state of the row at the given index.
     */
    const changeRowEnablement = (index) => {
        const newRows = [...rows];
        newRows[index].enabled = !rows[index].enabled;
        setRows(newRows);
    };

    /**
     * Deletes the row at the given index.
     */
    const deleteRow = (index) => {
        const newRows = [...rows].filter((_, i) => i !== index);
        setRows(newRows);
    };

    /**
     * Adds a new enabled row to the calculator, initializing it with number "1".
     */
    const addRow = () => {
        const newRows = [...rows, { number: 1, enabled: true }];
        setRows(newRows);
    };

    return (
        <Box className='calculator'>
            <Box className='rowsContainer'>
                <List>
                    {rows.map((row, index) =>
                        <Row
                            key={index}
                            index={index}
                            number={row.number}
                            enabled={row.enabled}
                            changeSign={changeRowSign}
                            changeNumber={changeRowNumber}
                            changeEnablement={changeRowEnablement}
                            deleteRow={deleteRow}
                        />
                    )}
                </List>
                <IconButton
                    title='Add row'
                    sx={{ marginTop: 1.5 }}
                    onClick={addRow}
                    variant='outlined'
                >
                    <AddIcon fontSize='medium' />
                </IconButton>
            </Box>
            {rows.length > 0 &&
                <Typography sx={{ paddingTop: 1.5 }}>
                    Result: {result}
                </Typography>
            }
        </Box>
    )
}

export default Calculator