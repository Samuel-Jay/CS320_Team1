import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch} from 'react-redux';
import Input from './Input.jsx'
import Score from './Score.jsx'

export default function FormDialog(data) {
    const open = data.open
    const handleClose = data.handleClose
    const id = data.task._id
    const isReviewer = data.isReviewer
    const task = data.task
    console.log(task)
    const [formData, setFormData] = useState({id,
                                              overallComments: " ",
                                              growthFeedbackComments: "",
                                              growthFeedbackScore: 0,
                                              kindnessFeedbackComments: "",
                                              kindnessFeedbackScore: 0,
                                              deliveryFeedbackComments: "",
                                              deliveryFeedbackScore: 0})

    function handleSave(){
        
    }
    function handleSubmit(){
        
    }

    function handleChange(e){
        console.log(e)
        setFormData({...formData, [e.target.name]: e.target.value})
        
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Performance Review</DialogTitle>
                <DialogContent>
	            <Input name="overallComments" label="Overall Comments" handleChange={handleChange}/>
                    <Score name="growthFeedbackScore" handleChange={handleChange}/>
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
