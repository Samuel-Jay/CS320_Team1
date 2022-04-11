import { Checkbox } from '@mui/material';
import "./Task_row.css";
import CircleCheckedOutline from "@mui/icons-material/CheckCircle"
import CircleUncheckedOutline from "@mui/icons-material/RadioButtonUnchecked"
import { color } from '@mui/system';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "./indiTask.jsx";
import List from "@mui/material/List";
import {useSelector} from 'react-redux';
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText';
import React, {useState, useEffect} from 'react';
import Task from './Task.jsx'
import {useDispatch} from 'react-redux';
import {changeDisp, incomplete, complete, archive, getTrainingTask} from '../../../actions/Task.js';

const Task_row = () => {
    const[background,setbackground] = useState("#ffff");
    const dispatch = useDispatch();
    const [show, setShow] = useState("all");
    useEffect(() => {
        dispatch(getTrainingTask())
    }, [dispatch])

    function handleClick(value){
        setShow(value)
    }
    const flexContainer ={
        display:'flex',
        flexDirection: 'row',
        backgroundColor: background,
        padding: 10,
    };

    const taskList=useSelector((state ) => state.task.taskList);
    console.log(taskList)
    return(
        <>
            <List style={flexContainer}>
                <ListItem button variant="outlined" onClick={ () => {handleClick("All")}}><ListItemText align="center" primary="All"/> </ListItem>
                <ListItem button variant="outlined" onClick={ () => {handleClick("Incomplete")}}><ListItemText align="center" primary="Uncompleted Tasks"/> </ListItem>
                <ListItem button variant="outlined" onClick={ () => {handleClick("Completed")}}><ListItemText align="center" primary="Completed Tasks"/> </ListItem>
                <ListItem button variant="outlined" onClick={ () => {handleClick("Archived")}}><ListItemText align="center" primary="Archived Tasks"/> </ListItem>
            </List>
            { 
                show==="All"?taskList.map(task=>

                    {
                        return(
                            <Task key={task._id} task={task}/>
                        )
                    }):( <></>
                       )
            }
            { 
                show==="Incomplete"?taskList
                    .filter(task => task.status === "Incomplete")
                    .map(task=>

                        {
                            return(
                                <Task key={task._id} task={task}/>
                            )
                    }):( <></>
                       )
            }
            { 
                show==="Completed"?taskList
                    .filter(task => task.status === "Completed")
                    .map(task=>
                        {
                            return(
                                <Task key={task._id} task={task}/>
                            )
                        }):( <></>
                           )
            }
            { 
                show==="Archived"?taskList
                    .filter(task => task.status === "Archived")
                    .map(task=>
                        {
                            console.log(task)
                            return(
                                <Task key={task._id} task={task}/>
                            )
                        }):( <></>
                           )
            }
        </>
    ) 
}
export default Task_row;
