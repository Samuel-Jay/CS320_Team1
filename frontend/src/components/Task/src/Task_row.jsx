import { Checkbox } from '@mui/material';
import "./Task_row.css";
<<<<<<< HEAD

=======
>>>>>>> main
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
<<<<<<< HEAD
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    function change_background(){
        setbackground("#F0F2F5");
    }
    function open_task()
    {
        change_background();
        dispatch(changeDisp())
    }
    function change_status(task)
    {
        if(task.get("status")==="incomplete")
        {
            task.changeStat("complete");
        }
        else if(task.get("status")==="archive")
        {
            task.changeStat("archive");
        }
        else
        {
            task.changeStat("incomplete");
        }
    }
    function proper_status(task)
    {
        if (task=== "incomplete")
        {
            dispatch(incomplete());
            list_items(task);
        }
        else if (task=== "complete")
        {
            dispatch(complete());
            list_items(task);
        }
        else
        {
            dispatch(archive());
            list_items(task);
        }
        const reload=useSelector((state ) => state.task.category)
        if(reload.toLower()==="uncomplete")
        {
            list_items("incomplete");
        }
        else
        {
            list_items(reload.toLower()==="uncomplete");
        }
    }
    function list_items(status)
    {
        const taskList=useSelector((state ) => state.task.taskList);
        return taskList.map(task=>
            {
                if(task.get("status")===status){
                    <div className='EmailRow' style={{ backgroundColor: background }} onClick={open_task()}>
                    <Checkbox defaultChecked size="small" onChange={change_status(task)} icon={<CircleCheckedOutline />} checkedIcon={<CircleUncheckedOutline />}>
                    </Checkbox>
                    <h3 className=" EmailRow_title">
                        {task.get("name")}
                    </h3>
                    <div className="EmailRow_Subject">
                        <h4>
                            {task.get("subject")}
                            <span className='EmailRow_Description'>
                                {task.get("description")}
                            </span>
                        </h4>
                    </div>
                    <div className="time">
                        {task.get("time")}
                    </div>
                    <div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Arch
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={change_status("archive")}>Archive</MenuItem>
                        <MenuItem onClick={change_status("incomplete")}> Unarchive </MenuItem>
                    </Menu>
                    </div>
                    </div>
                
                }
            })
    }
  return (

    <><List style={flexContainer}>
          <ListItem button onClick={ proper_status("incomplete")}><ListItemText align="center" primary="Uncompleted Tasks"/> </ListItem>
          <ListItem button onClick={proper_status("complete")}><ListItemText align="center" primary="Completed Tasks"/> </ListItem>
          <ListItem button onClick={proper_status("archive")}><ListItemText align="center" primary="Archived Tasks"/> </ListItem>
      </List>
      <List>
        {list_items("incomplete")}
      </List>
      </>
  );
=======

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
>>>>>>> main
}
export default Task_row;
