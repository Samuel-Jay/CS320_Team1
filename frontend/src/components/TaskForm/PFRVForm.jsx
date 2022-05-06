import { Paper, Button, TextField, Grid, Box, Typography, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';
import React, {useState, useEffect} from 'react';
import Input from './Input.jsx';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {createPerformanceReview, getEmployees, getPerformanceReview} from '../../actions/PerformanceReview.js';

function PFRVForm(){
    const dispatch = useDispatch();
    const [taskForm, setTaskForm] = useState({reviewerEmail: "", startDate: new Date(), dueDate: new Date()})
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        dispatch(getEmployees());
    }, [dispatch])

    function handleSubmit(e){
              e.preventDefault();
        dispatch(createPerformanceReview(taskForm)).then(() => {
            setSuccess(true)
            dispatch(getPerformanceReview())
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

    let employees = useSelector(state => state.PerformanceReview.employees)
    console.log(employees)
    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form onSubmit={handleSubmit}>
                    <Box p={1}>
                        <FormControl fullWidth>
                            <InputLabel id="reviewerEmail">Reviewer email</InputLabel>
                            <Select
                                labelId="email"
                                id="reviewerEmail"
                                name="reviewerEmail"
                                value={taskForm.reviewerEmail}
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

export default PFRVForm 
