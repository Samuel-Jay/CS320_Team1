import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function Score({ name, handleChange, label, value}) {
    const score = [1,2,3,4,5]
    return (
        <FormControl fullWidth>
            <InputLabel id="reviewerEmail">{name}</InputLabel>
            <Select name={name} value={value} label={label} onChange={handleChange}>
                {
                    score.map((s) =>( 
                        <MenuItem key={s} value={s}>{s}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );}
export default Score;
