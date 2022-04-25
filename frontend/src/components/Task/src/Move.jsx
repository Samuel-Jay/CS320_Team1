import { Button } from '@mui/material';
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
export default function MoveButton() {
    return(
        <div>
        <Button   variant="contained" sx={{backgroundColor: '#005151', '&:hover':{bgcolor:"#20B3A7"}, m:2}} >
        Move
        </Button>
        </div>


    )
}