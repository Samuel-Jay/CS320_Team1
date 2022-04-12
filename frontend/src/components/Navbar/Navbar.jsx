import React, {useState, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router'
import {useDispatch} from 'react-redux'
import { Menu, MenuItem, Typography, Toolbar, AppBar, Box, Button, IconButton } from '@mui/material'
import {Link } from 'react-router-dom'
import  Avatar from './Avatar.jsx'
import TaskForm from '../TaskForm/TaskForm.jsx'
import iconButton from '@mui/material/IconButton';
import logo from '../../styles/img/logo.png';

function Navbar(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    useEffect(() =>{
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location, dispatch]);
    return(
        <AppBar position="sticky" variant="dense" style={{ background: '#199086' }}>
	    <Toolbar>
            <img src={logo} width="100" ></img>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            </Box>
	        {
		    user===null ? (
			<Button component={Link} to={"/login"} variant="contained" style={{ background: '#005151' }}>Sign In</Button>
		    ) : (
                        <>
                            <TaskForm/>
                            <Avatar/>
                        </>
		    )
	        }
	    </Toolbar>
        </AppBar>
    )
}
export default Navbar;


