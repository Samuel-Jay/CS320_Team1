import React, {useState, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router'
import {useDispatch} from 'react-redux'
import { Menu, MenuItem, Typography, Toolbar, AppBar, Box, Button, IconButton } from '@mui/material'
import { shadows } from '@mui/system';
import TypeList from './TypeList/TypeList.jsx'
import StatusList from './StatusList/StatusList.jsx'
import ReceiveList from './ReceiveList/ReceiveList.jsx'


function Mailbar(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    return(
        <AppBar position="sticky" variant="dense" style={{ background: '#ffffff' }}  sx={{ boxShadow: 2 }}>
	    <Toolbar>
                <TypeList/>
                <StatusList/>
                <ReceiveList/>
	    </Toolbar>
        </AppBar>
    )
}
export default Mailbar;


