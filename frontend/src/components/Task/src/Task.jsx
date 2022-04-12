import React, {useState} from "react";
import {Checkbox, Button, Menu, MenuItem}  from "@mui/material";

import CircleCheckedOutline from "@mui/icons-material/CheckCircle";
import CircleUncheckedOutline from "@mui/icons-material/RadioButtonUnchecked";
function Task(task){
    const[background,setbackground] = useState("#ffff");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    function handleClose(){
        setAnchorEl(null);
    }
    function handleClick(event){
        setAnchorEl(event.currentTarget);
    }

    function change_background(){
        setbackground("#F0F2F5");
    }

    function change_status(){}
    function handleWindow(task){
        console.log("chichke");
        return( <Window task={task}/>);
    }
    function open_task(){

        
    }
    return (
        <div className="EmailRow" style={{ backgroundColor: '#FFFFFF' }} onClick={()=>{handleWindow(task)}}>
            <Checkbox  size="small" onChange={change_status(task)} style ={{color: "#199086",}}  />
            <h3 className=" EmailRow_title">
                {task.task.assignerEmail}
            </h3>
            <div className="EmailRow_Subject">
                
                <h4>
                    {task.task.taskName+":"}
                    <span className="EmailRow_Description">
                        {task.task.taskDescription}
                    </span>
                </h4>
            </div>
            <div className="time">
                {task.task.dueDate.split("T")[0].split("-")[1]+"/"+task.task.dueDate.split("T")[0].split("-")[2]+"/"+task.task.dueDate.split("T")[0].split("-")[0]}
            </div>
        
        </div>
    );
}

export default Task;
