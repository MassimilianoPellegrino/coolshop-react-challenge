import { useMemo } from 'react';
import { IconButton, ListItem, MenuItem, Select, Switch, TextField } from '@mui/material';
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    Cancel as CloseIcon,
} from '@mui/icons-material';

function Row({
    index,
    number,
    enabled,
    changeSign,
    changeNumber,
    changeEnablement,
    deleteRow
}) {

    /**
     * Calculates and stores the sign of the row number every time it is changed.
     */
    const sign = useMemo(() => number > 0 ? '+' : '-', [number]);

    /**
     * Handles the change of the row number, updating the state variable in the parent "Calculator" component.
     */
    const handleEnteredNumber = (e) => {
        const enteredNumber = Math.abs(parseFloat(e.target.value));
        if (enteredNumber < Infinity) {
            const newNumber = sign === '+' ? enteredNumber : -enteredNumber;
            changeNumber(index, newNumber);
        }
    };

    return (
        <ListItem disablePadding sx={{ marginTop: 1.5 }}>
            <Select
                color='text.primary'
                sx={{ marginRight: 1 }}
                variant='standard'
                value={sign}
                onChange={() => changeSign(index)}
            >
                <MenuItem value='+'>
                    <AddIcon
                        color={enabled ? 'inherit' : 'disabled'}
                        fontSize='inherit'
                    />
                </MenuItem>
                <MenuItem value='-' >
                    <RemoveIcon
                        color={enabled ? 'inherit' : 'disabled'}
                        fontSize='inherit'
                    />
                </MenuItem>
            </Select>
            <TextField
                color='text.primary'
                sx={{ input: { color: enabled ? 'text.primary' : 'text.disabled' }, marginRight: 1 }}
                variant='standard'
                value={Math.abs(number)}
                onChange={e => handleEnteredNumber(e)}
            />
            <IconButton
                sx={{ marginRight: 0.5 }}
                title='Delete'
                onClick={() => deleteRow(index)}
                variant='contained'
            >
                <CloseIcon fontSize='small' />
            </IconButton>
            <Switch
                title={enabled ? 'Disable' : 'Enable'}
                defaultChecked
                size='small'
                onChange={() => changeEnablement(index)}
            />
        </ListItem>
    );
}

export default Row;