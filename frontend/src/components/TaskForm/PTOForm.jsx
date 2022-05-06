import { Paper, Button, TextField, Grid, Box, Typography, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import DateTimePicker from '@mui/lab/DateTimePicker';
// import DateAdapter from '@mui/lab/AdapterDateFns';
import React, {useState} from 'react';
import Input from './Input.jsx';
import {useDispatch} from 'react-redux';
import {createPTO, getPTO} from '../../actions/PTO.js';

function PTOForm(){
    const dispatch = useDispatch();
    const [taskForm, setTaskForm] = useState({title: "", reason: "", endDate: "", startDate: new Date(), dueDate: new Date(), endDate: new Date()})
    const [success, setSuccess] = useState(false)
    function handleSubmit(e){
        e.preventDefault();
        console.log(taskForm);
        dispatch(createPTO(taskForm)).then(() =>{
            setSuccess(true)
            dispatch(getPTO())
        });
    }

    function handleChange(e){
        setTaskForm({...taskForm, [e.target.name]: e.target.value});
    }

    function handleStartDateChange(newDate){
        setTaskForm({...taskForm, startDate: newDate})
    }

    function handleDueDateChange(newDate){
        setTaskForm({...taskForm, dueDate: newDate})
    }

    function handleEndDateChange(newDate){
        setTaskForm({...taskForm, endDate: newDate})
    }
    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form onSubmit={handleSubmit}>
                <Box p={1}>
	            <Input name="title" label="Title" handleChange={handleChange}/>
	            <Input name="reason" label="Reason" handleChange={handleChange}/>
                    <DesktopDatePicker label="Start Date" inputFormat="MM/dd/yyyy" value={taskForm.startDate} onChange={handleStartDateChange} renderInput={(params) => <TextField {...params} />}/>
                    <DesktopDatePicker label="End Date" inputFormat="MM/dd/yyyy" value={taskForm.endDate} onChange={handleEndDateChange} renderInput={(params) => <TextField {...params} />}/>
                    <DesktopDatePicker label="Due Date" inputFormat="MM/dd/yyyy" value={taskForm.dueDate} onChange={handleDueDateChange} renderInput={(params) => <TextField {...params} />}/>
		    <Button type="submit" align="center" variant="contained" fullWidth>Submit</Button>
                </Box>
	    </form>
            {
                success?(<Typography>
                             Successfully sent form 
                         </Typography>):(<></>)
            }
        </LocalizationProvider >
    )
}

export default PTOForm 
