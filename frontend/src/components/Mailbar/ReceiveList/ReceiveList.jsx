import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {changeReceive} from '../../../actions/Task.js'
import {useDispatch, useSelector} from 'react-redux';

export default function BasicSelect() {
    const dispatch = useDispatch()
    const current = useSelector(state => state.task.receive)
    const [receive, setReceive] = React.useState(current);

    const handleChange = (e) => {
        dispatch(changeReceive(e.target.value))
        setReceive(e.target.value)
    };

    return (
        <Box sx={{ minWidth: 360 }}>
            <FormControl fullWidth>
                <InputLabel >Receive</InputLabel>
                <Select
                    value={receive}
                    label="Receive"
                    onChange={handleChange}
                >
                    <MenuItem value="send" >Sent</MenuItem>
                    <MenuItem value="receive" >Received</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
