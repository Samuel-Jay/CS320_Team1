import React, {useState} from "react";
import {selectTask} from "../../../actions/Task.js"
import {useDispatch, useSelector} from "react-redux";
import {openTask, closeTask} from "../../../actions/Task.js";
import {Box, Checkbox, Button, Menu, MenuItem}  from "@mui/material";

function Task(task){
    const dispatch = useDispatch();
    const[background,setbackground] = useState("#ffff");
    const[width_task,setwidth_task] = useState("100%");
    const [anchorEl, setAnchorEl] = useState(null);
    const checked = useSelector((state) => state.TrainingTask.selectTask).includes(task.task)

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
    function changeStatus(task){
        dispatch(selectTask(task.task));
    }
    function handleWindow(task){
        console.log("clicked")
    }
    return (
        <Box m={1} margin display="flex" justifyContent="flex-end" alignItems="flex-end">
            <div className="EmailRow" style={{}} >
                <Checkbox  size="small" checked={checked} onChange={() => changeStatus(task)} style ={{color: "#199086",}}  />
            </div>
            <div className="EmailRow" style={{ backgroundColor: background,width :width_task }} onClick={()=>{handleWindow(task)}}>
                <div className="EmailRow_title">
                    {task.task.employeeEmail}
                </div>
                <div className="EmailRow_Subject">
                    <h4>
                        {task.task.title+":"}
                        {task.task.reason}
                    </h4>
                </div>
                <div className="EmailRow_time">
                    Start Date: {task.task.startDate.split("T")[0].split("-")[1]+"/"+task.task.startDate.split("T")[0].split("-")[2]+"/"+task.task.startDate.split("T")[0].split("-")[0]}
                </div>
                <div className="EmailRow_time">
                    End Date: {task.task.endDate.split("T")[0].split("-")[1]+"/"+task.task.endDate.split("T")[0].split("-")[2]+"/"+task.task.endDate.split("T")[0].split("-")[0]}
                </div>
                <div className="EmailRow_time">
                    Due Date: {task.task.dueDate.split("T")[0].split("-")[1]+"/"+task.task.dueDate.split("T")[0].split("-")[2]+"/"+task.task.dueDate.split("T")[0].split("-")[0]}
                </div>
                <div className="EmailRow_time">
                    Status: {task.task.status}
                </div>
            </div>
        </Box>
    )
}

export default Task;
