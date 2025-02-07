import { useMemo, useState } from 'react';
import Row from './Row';
import './Calculator.css'
import { Box, IconButton, List, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

function Calculator() {

    const [rows, setRows] = useState([
        { number: 100, enabled: true },
        { number: 30, enabled: true },
        { number: -7, enabled: true }
    ]);

    const calculateResult = () =>
        rows.reduce((partialSum, currentRow) =>
            currentRow.enabled ? partialSum + currentRow.number : partialSum, 0);

    const result = useMemo(calculateResult, [rows]);

    const changeRowSign = (index) => {
        const newRows = [...rows];
        newRows[index].number = -rows[index].number;
        setRows(newRows);
    };

    const changeRowNumber = (index, newNumber) => {
        const newRows = [...rows];
        newRows[index].number = newNumber;
        setRows(newRows);
    };

    const changeRowEnablement = (index) => {
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
        newRows.push({ number: 1, enabled: true });
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
                    sx={{ paddingTop: 1.5 }}
                    onClick={addRow}
                    variant='outlined'
                >
                    <AddIcon fontSize='medium' />
                </IconButton>
            </Box>
            {rows.length > 0 &&
                <Typography paddingTop={1.5}>
                    Result: {result}
                </Typography>
            }
        </Box>
    )
}

export default Calculator