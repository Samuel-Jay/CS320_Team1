import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {changeStatus} from "../../../actions/Task.js"
import {Checkbox, Button, Menu, MenuItem}  from "@mui/material";
import CircleCheckedOutline from "@mui/icons-material/CheckCircle";
import CircleUncheckedOutline from "@mui/icons-material/RadioButtonUnchecked";
function Task(task){
    const dispatch = useDispatch()
    const[background,setbackground] = useState("#ffff");
    const [anchorEl, setAnchorEl] = useState(null);
    const [check, setCheck] = useState(false);
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

    function change_status(status){
        dispatch(changeStatus({task, status}))
    }

    function checked(){}

    function handleChange(){
        setCheck(prevState => !prevState)
    }

    function open_task(){
    }
    return (
        <div className="EmailRow" style={{ backgroundColor: background }} onClick={open_task}>
            <div className = "Checkbox">
                {
                    check?(
                        <Checkbox 
                        onClick={handleChange}/>
                    ):(                
                    <Checkbox
                        checked={checked}
                        onClick={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    )
                }

            </div>
            <h3 className=" EmailRow_title">
                {task.task.taskName}
            </h3>
            <div className="EmailRow_Subject">
                <h4>
                    <span className="EmailRow_Description">
                        {task.task.taskDescription}
                    </span>
                </h4>
            </div>
            <div className="time">
                {task.task.dueDate}
            </div>
            {/* <div> */}
                {/* <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    Change Status
                </Button> */}
                {/* <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    <MenuItem onClick={() => {change_status("Archived")}}>Archive</MenuItem>
                    <MenuItem onClick={() => {change_status("Incomplete")}}> Incomplete </MenuItem>
                    <MenuItem onClick={() => {change_status("Completed")}}> Complete </MenuItem>
                </Menu> */}
            {/* </div> */}
        </div>
    );
}

export default Task;
