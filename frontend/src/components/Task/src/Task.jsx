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

    function open_task(){
        
    }
    return (
        <div className="EmailRow" style={{ backgroundColor: background }} onClick={open_task}>
            <Checkbox defaultChecked size="small" onChange={change_status(task)} icon={<CircleCheckedOutline />} checkedIcon={<CircleUncheckedOutline />}>
            </Checkbox>
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
            <div>
                <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
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
                        "aria-labelledby": "basic-button",
                    }}
                >
                    <MenuItem onClick={change_status("archive")}>Archive</MenuItem>
                    <MenuItem onClick={change_status("incomplete")}> Unarchive </MenuItem>
                </Menu>
            </div>
        </div>
    );
}

export default Task;
