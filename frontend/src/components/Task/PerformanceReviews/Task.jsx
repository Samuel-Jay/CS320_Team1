import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {openTask, closeTask, selectTask} from "../../../actions/Task.js";
import {Checkbox, Button, Menu, MenuItem, Box}  from "@mui/material";
import Form from "./Form.jsx"

function Task(task){
    const dispatch = useDispatch();
    const[background,setbackground] = useState("#ffff");
    const[width_task,setwidth_task] = useState("100%");
    const [anchorEl, setAnchorEl] = useState(null);
    const checked = useSelector((state) => state.TrainingTask.selectTask).includes(task.task)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function changeStatus(task){
        dispatch(selectTask(task.task));
    }

    return (
        <>
            <Form open={open} task={task} handleClose={handleClose}/>
            <Box m={1} margin display="flex" justifyContent="flex-end" alignItems="flex-end">
                    <div className="EmailRow" style={{}} >
                <Checkbox  size="small" checked={checked} onChange={() => changeStatus(task)} style ={{color: "#199086",}}  />
            </div>
                <div className="EmailRow" style={{ backgroundColor: background,width :width_task }} onClick={handleClickOpen}>
                    <div className="EmailRow_title">
                        {task.task.reviewerEmail}
                    </div>
                    <div className="EmailRow_Subject">
                        
                    <h4>
                        <span className="EmailRow_Description">
                            {task.task.revieweeEmail}
                        </span>
                    </h4>
                </div>
                <div className="EmailRow_time">
                    startDate: {task.task.dueDate.split("T")[0].split("-")[1]+"/"+task.task.dueDate.split("T")[0].split("-")[2]+"/"+task.task.dueDate.split("T")[0].split("-")[0]}
                </div>
                <div className="EmailRow_time">
                    dueDate: {task.task.dueDate.split("T")[0].split("-")[1]+"/"+task.task.dueDate.split("T")[0].split("-")[2]+"/"+task.task.dueDate.split("T")[0].split("-")[0]}
                </div>

                <div className="EmailRow_time">
                    status: {task.task.status}
                </div>
            </div>
        </Box>
        </>
    )
}

export default Task;
