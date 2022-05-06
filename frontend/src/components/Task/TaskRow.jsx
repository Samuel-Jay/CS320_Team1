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
import {useDispatch} from 'react-redux';
import {openTask} from '../../actions/Task.js';

import TrainingTasks from './TrainingTasks/TrainingTasks.jsx'
import PerformanceReviews from './PerformanceReviews/PerformanceReviews.jsx'
import PTOs from './PTOs/PTOs.jsx'

const TaskRow = () => {
    const dispatch = useDispatch();


    const flexContainer ={
        display:'flex',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 0,
    };
    const type = useSelector(state => state.task.type)
    console.log(type)
    return(
        type== "Training"?(
            <TrainingTasks/>
        ):(
            type== "Performance"?(
                <PerformanceReviews/>
            ):(
                type== "PTO"?(
                    <PTOs/>
                ):(
                    <></>
                )
            )
        )
    )
}
export default TaskRow
