import { Paper, Button, TextField, Grid, Box, Typography, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';
import React, {useState, useEffect} from 'react';
import Input from './Input.jsx';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {signin} from '../../actions/User.js';
import {useNavigate} from 'react-router-dom';
import {createTrainingTask} from '../../actions/Task.js';

function TrainingForm(){
    const dispatch = useDispatch();
    const [taskForm, setTaskForm] = useState({assignerEmail: JSON.parse(localStorage.getItem("profile")).user.email, assigneeEmail: "",taskName: "", taskLink: "", taskDescription: "", startDate: new Date(), dueDate: new Date()})
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const employees = JSON.parse(localStorage.getItem("employees"))
    function handleSubmit(e){
        e.preventDefault();
        console.log(taskForm);
        dispatch(createTrainingTask(taskForm)).then(
            setSuccess(true)
        );
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
    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form onSubmit={handleSubmit}>
                <Box p={1}>
                    <FormControl fullWidth>
                        <InputLabel id="email">Email</InputLabel>
                        <Select
                            labelId="email"
                            id="assigneeEmail"
                            name="assigneeEmail"
                            value={taskForm.assigneeEmail}
                            label="email"
                            onChange={handleChange}
                        >
                            {
                                employees.map((employee) =>( 
                                    <MenuItem key={employee.email} value={employee.email}>{employee.email}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
	            <Input name="taskName" label="Name" handleChange={handleChange}/>
	            <Input name="taskLink" label="Link" handleChange={handleChange}/>
	            <Input name="taskDescription" label="Description" handleChange={handleChange}/>
                    <DesktopDatePicker label="Start Date" inputFormat="MM/dd/yyyy" value={taskForm.startDate} onChange={handleStartDateChange} renderInput={(params) => <TextField {...params} />}/>
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

export default TrainingForm
