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
import {openTask} from '../../../actions/Task.js';
import {getPerformanceReview} from '../../../actions/PerformanceReview.js';

const PerformanceReviews = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("use effecting")
        dispatch(getPerformanceReview());
    }, [dispatch])

    const flexContainer ={
        display:'flex',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 0,
    };

    const receive = useSelector((state) => state.task.receive);
    let taskList=useSelector((state ) => state.PerformanceReview);
    if(receive == "receive"){
        taskList = taskList.taskList
    }else{
        taskList = taskList.sentList
    }
    const query = useSelector((state) => state.task.query);
    const show = useSelector((state) => state.task.status);
    return(
        <div>
            { 
                show==="All"?taskList.filter(task => {
                    return query === ""
                        || task.reviewerEmail.toLowerCase().includes(query.toLowerCase())
                        || task.revieweeEmail.toLowerCase().includes(query.toLowerCase())
                }).map(task=>
                    {
                        return(
                            <Task key={task._id} task={task} />
                        )
                    }):(taskList.filter(task=>{
                        return show.toLowerCase()===task.status.toLowerCase()
                            && (query === ""
                                || task.reviewerEmail.toLowerCase().includes(query.toLowerCase())
                                || task.revieweeEmail.toLowerCase().includes(query.toLowerCase())
                               )
                    }).map(task=>
                        {
                            return(
                                <Task key={task._id} task={task} />
                            )
                        }
                    ))
            }
            
        </div>
        
    ) 
}
export default PerformanceReviews;
