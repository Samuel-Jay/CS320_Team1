import React, {useState, useEffect} from 'react';
import {Button, TextField, Dialog, FormControl, DialogActions, DialogContent, DialogTitle, Select, MenuItem} from '@mui/material'
import TrainingForm from './TrainingForm.jsx';
import PFRVForm from './PFRVForm.jsx';
import PTOForm from './PTOForm.jsx';
import {getEmployees} from '../../actions/Task.js';
import {getTrainingTask} from '../../actions/Task.js';
import {useDispatch} from 'react-redux'

export default function FormDialog() {
    const dispatch = useDispatch()
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const [open, setOpen] = useState(false);
    const [taskType, changeTaskType] = useState("");
    const taskTypes = [
        'Training',
        'Paid Time Off',
        'Performance Review'
    ];

    const handleClickOpen = () => { 
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        changeTaskType(e.target.value)
    }

    return (
        <div>
            <Button   variant="contained" sx={{backgroundColor: '#005151', '&:hover':{bgcolor:"#20B3A7"}}} onClick={handleClickOpen}>
                Create Task
        </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{bgcolor: '#199086',}}>
                    Create Task
                    </DialogTitle>
                <DialogContent >

                    <FormControl sx={{ m: 1, width: 300 }}>
                        <Select labelId="task type" id="task type" value={taskType} label="task type" onChange={handleChange} MenuProps={MenuProps}>
                        {
                            taskTypes.map((types) => (
                                <MenuItem key={types} value={types}>{types}</MenuItem>
                            ))
                        }
                    </Select>
                    </FormControl>
                    {
                        taskType === "Training"?(
                            <TrainingForm/>
                        ):(
                            <></>
                        )
                    }
                    {
                        taskType === "Performance Review"?(
                            <PFRVForm/>
                        ):(
                            <></>
                        )
                    }
                    {
                        taskType === "Paid Time Off"?(
                            <PTOForm/>
                        ):(
                            <></>
                        )
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{color:"#005151"}}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
