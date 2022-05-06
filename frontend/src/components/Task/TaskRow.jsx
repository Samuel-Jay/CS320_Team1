import { Checkbox } from '@mui/material';
import "./TaskRow.css";
import { color } from '@mui/system';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from "@mui/material/List";
import {useSelector} from 'react-redux';
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText';
import React, {useState, useEffect} from 'react';
import Task from './Task.jsx'
import {useDispatch} from 'react-redux';
import {openTask} from '../../actions/Task.js';
import TrainingTasks from './TrainingTasks.jsx'
import PerformanceReviews from './PerformanceReviews.jsx'
import PTO from './PTO.jsx'
import Generic from './Generic.jsx'

const TaskRow = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState("all");

    function handleClick(value){
        console.log(value)
        setShow(value);
    }
    function handleWindow(task){
        dispatch(openTask(task))
    }
    const flexContainer ={
        display:'flex',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 0,
    };
    const type = useSelector(state => state.task.type)
    console.log(type)
    if (type == "Training"){
        return(
            <TrainingTasks/>

        )
    }
    else if (type == "Performace"){
        return(
            <PerformanceReviews/>
        )
    }else if (type == "PTO"){
        return(
            <PTO/>
        )
    }else{
        return(
            <Generic/>
        )
        
    }
}
export default TaskRow;
