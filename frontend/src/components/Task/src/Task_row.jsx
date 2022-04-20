import { Checkbox } from '@mui/material';
import "./Task_row.css";
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
    const dispatch = useDispatch();
    const [show, setShow] = useState("all");
    useEffect(() => {
        dispatch(getTrainingTask());
    }, [dispatch])

    function handleClick(value){
        setShow(value);
    }
    const flexContainer ={
        display:'flex',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 10,
    };
    function handleWindow(task){
        return( <Window task={task}/>);
    }
    const taskList=useSelector((state ) => state.task.taskList);
    const query = useSelector((state) => state.task.query);
    return(
        <>
            <List style={flexContainer}>
                <ListItem button variant="outlined" style={{color: '#FFFFFF'}} sx={{backgroundColor: show=="All"?"#005151":"#199086"}} onClick={ () => {handleClick("All")}}><ListItemText align="center" primary="All"/> </ListItem>
                <ListItem button variant="outlined" style={{color: '#FFFFFF'}} sx={{backgroundColor: show=="Incomplete"?"#005151":"#199086"}} onClick={ () => {handleClick("Incomplete")}}><ListItemText align="center" primary="Uncompleted Tasks"/> </ListItem>
                <ListItem button variant="outlined" style={{color: '#FFFFFF'}} sx={{backgroundColor: show=="Completed"?"#005151":"#199086"}} onClick={ () => {handleClick("Completed")}}><ListItemText align="center" primary="Completed Tasks"/> </ListItem>
                <ListItem button variant="outlined" style={{color: '#FFFFFF'}} sx={{backgroundColor: show=="Archived"?"#005151":"#199086"}} onClick={ () => {handleClick("Archived")}}><ListItemText align="center" primary="Archived Tasks"/> </ListItem>
            </List>
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
                            return(
                                <>
                                    <Task key={task._id} task={task} onClick={()=>{handleWindow(task)}}/>
                                </>
                            )
                        }):( <>
                             </>
                           )
                }
            </>
        ) 
}
export default Task_row;
