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
import {getTrainingTask} from '../../actions/TrainingTask.js';

const TraningTasks = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("use effecting")
        dispatch(getTrainingTask());
    }, [dispatch])

    function handleWindow(task){
        dispatch(openTask(task))
    }
    const flexContainer ={
        display:'flex',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 0,
    };
    let taskList=useSelector((state ) => state.TrainingTask.taskList);
    console.log(taskList)
    const query = useSelector((state) => state.task.query);
    const show = useSelector((state) => state.task.status);
    return(
        <div>
            { 
                show==="All"?taskList.filter(task => {
                    return query === ""
                        || task.assignerEmail.toLowerCase().includes(query.toLowerCase())
                        || task.assigneeEmail.toLowerCase().includes(query.toLowerCase())
                        || task.taskDescription.toLowerCase().includes(query.toLowerCase())
                        || task.taskLink.toLowerCase().includes(query.toLowerCase())
                        || task.taskName.toLowerCase().includes(query.toLowerCase())
                }).map(task=>
                    {
                        console.log(task)
                        return(
                            <Task key={task._id} task={task} onClick={()=>{handleWindow(task)}}/>
                        )
                    }):(taskList.filter(task=>{
                        return show.toLowerCase()===task.status.toLowerCase()
                            && (query === ""
                                || task.taskDescription.toLowerCase().includes(query.toLowerCase())
                                || task.taskLink.toLowerCase().includes(query.toLowerCase())
                                || task.taskName.toLowerCase().includes(query.toLowerCase()))
                    }).map(task=>
                        {
                            return(
                                <Task key={task._id} task={task} onClick={()=>{handleWindow(task)}}/>
                            )
                        }
                    ))
            }
            
        </div>
        
    ) 
}
export default TraningTasks;
