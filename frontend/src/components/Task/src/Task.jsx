import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {openTask, closeTask} from "../../../actions/Task.js";
import {Checkbox, Button, Menu, MenuItem}  from "@mui/material";
import CircleCheckedOutline from "@mui/icons-material/CheckCircle";
import CircleUncheckedOutline from "@mui/icons-material/RadioButtonUnchecked";

function Task(task){
    const dispatch = useDispatch();
    const[background,setbackground] = useState("#ffff");
    const[width_task,setwidth_task] = useState("100%");
    const [anchorEl, setAnchorEl] = useState(null);
    const [openWindow, setOpenWindow] = useState(null);
    const open = Boolean(anchorEl);
    function handleClose(){
        setAnchorEl(null);
    }
    function handleClick(event){
        setAnchorEl(event.currentTarget);
    }

    function changeWidth(){
        setwidth_task("70%");
    }
    function changeBackground(){
        setbackground("#F0F2F5");
    }
    function change_status(){}
    function handleWindow(task){
        dispatch(openTask(task.task));
    }
    function closeWindow(){
        dispatch(closeTask());
    }
    return (
        <div className="EmailRow" style={{ backgroundColor: background,width :width_task }} onClick={()=>{changeBackground();changeWidth();handleWindow(task)}}>
            <Checkbox  size="small" onChange={change_status(task)} style ={{color: "#199086",}}  />
            <div className="EmailRow_title">
                {task.task.assignerEmail}
            </div>
            <div className="EmailRow_Subject">
                
                <h4>
                    {task.task.taskName+":"}
                    <span className="EmailRow_Description">
                        {task.task.taskDescription}
                    </span>
                </h4>
            </div>
            <div className="EmailRow_time">
                {task.task.dueDate.split("T")[0].split("-")[1]+"/"+task.task.dueDate.split("T")[0].split("-")[2]+"/"+task.task.dueDate.split("T")[0].split("-")[0]}
            </div>
        </div>
    )
}

export default Task;
