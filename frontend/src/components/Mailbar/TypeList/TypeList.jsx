import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useDispatch, useSelector} from 'react-redux'
import {changeType} from '../../../actions/Task.js'

export default function BasicSelect() {
    const dispatch = useDispatch();
    const current = useSelector(state=>state.task.type)
    const [type, setType] = React.useState(current);
    const handleChange = (e) => {
        dispatch(changeType(e.target.value))
        setType(e.target.value)
    };

    return (
        <Box sx={{ minWidth: 360 }}>
            <FormControl fullWidth>
                <InputLabel >Type</InputLabel>
                <Select
                    value={type}
                    label="Type"
                    onChange={handleChange}
                >
                    <MenuItem value="Training" >Training Task</MenuItem>
                    <MenuItem value="Performance" >Performance Review</MenuItem>
                    <MenuItem value="PTO">Paid Time Off</MenuItem>
                    <MenuItem value="Generic">Generic Task</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
