import { useMemo } from 'react';
import './Row.css';
import { IconButton, ListItem, MenuItem, Select, TextField } from '@mui/material';
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    DeleteOutline as DeleteIcon,
    PowerSettingsNew as PowerSettingsNewIcon
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

    const sign = useMemo(() => number > 0 ? '+' : '-', [number]);

    const handleChangedInputValue = (e) => {
        const enteredNumber = Math.abs(parseFloat(e.target.value));
        if (enteredNumber > 0) {
            const newNumber = sign === '+' ? enteredNumber : -enteredNumber;
            changeNumber(index, newNumber);
        }
    };

    return (
        <ListItem disablePadding sx={{paddingTop: 1.5}}>
            <Select
                sx={{marginRight: 1}}
                variant='standard'
                className='selectSign'
                value={sign}
                onChange={() => changeSign(index)}
            >
                <MenuItem
                    value='+'
                >
                    <AddIcon
                        color={enabled ? 'inherit' : 'disabled'}
                        fontSize='inherit'
                    />
                </MenuItem>
                <MenuItem
                    value='-'
                >
                    <RemoveIcon
                        color={enabled ? 'inherit' : 'disabled'}
                        fontSize='inherit'
                    />
                </MenuItem>
            </Select>
            <TextField
                sx={{ input: { color: enabled ? 'text.primary' : 'text.disabled' } }}
                variant='standard'
                value={Math.abs(number)}
                onChange={e => handleChangedInputValue(e)}
            />
            <IconButton
                onClick={() => changeEnablement(index)}
                variant='contained'
            >
                <PowerSettingsNewIcon
                    fontSize='small'
                    color={enabled ? 'success' : 'disabled'}
                />
            </IconButton>
            <IconButton
                onClick={() => deleteRow(index)}
                variant='contained'
            >
                <DeleteIcon
                    fontSize='small'
                />
            </IconButton>
        </ListItem>
    );
}

export default Row;