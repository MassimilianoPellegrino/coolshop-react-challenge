import { useMemo } from 'react';
import './Row.css';
import { IconButton, ListItem, MenuItem, Select, Switch, TextField } from '@mui/material';
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    Cancel as CloseIcon,
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
        if (enteredNumber > 0 && enteredNumber < Infinity) {
            const newNumber = sign === '+' ? enteredNumber : -enteredNumber;
            changeNumber(index, newNumber);
        }
    };

    return (
        <ListItem disablePadding sx={{paddingTop: 1.5}}>
            <Select
                color='text.primary'
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
                color='text.primary'
                sx={{ input: { color: enabled ? 'text.primary' : 'text.disabled' } }}
                variant='standard'
                value={Math.abs(number)}
                onChange={e => handleChangedInputValue(e)}
            />
            <Switch defaultChecked size='small' onChange={() => changeEnablement(index)}/>
            <IconButton
                onClick={() => deleteRow(index)}
                variant='contained'
            >
                <CloseIcon
                    fontSize='small'
                />
            </IconButton>
        </ListItem>
    );
}

export default Row;