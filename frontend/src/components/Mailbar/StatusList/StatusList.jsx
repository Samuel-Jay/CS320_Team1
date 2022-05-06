import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {changeStatus} from '../../../actions/Task.js'
import {useDispatch, useSelector} from 'react-redux';

export default function BasicSelect() {
    const dispatch = useDispatch()
    const current = useSelector(state => state.task.status)
    const [state, setState] = React.useState(current);

    const handleChange = (e) => {
        dispatch(changeStatus(e.target.value))
        setState(e.target.value)
    };

    return (
        <Box sx={{ minWidth: 360 }}>
            <FormControl fullWidth>
                <InputLabel >State</InputLabel>
                <Select
                    value={state}
                    label="State"
                    onChange={handleChange}
                >
                    <MenuItem value="All" >All</MenuItem>
                    <MenuItem value="Incomplete" >Incomplete</MenuItem>
                    <MenuItem value="Progress">In Progress</MenuItem>
                    <MenuItem value="Completed" >Completed</MenuItem>
                    <MenuItem value="Archived">Archived</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
