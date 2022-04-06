import React, {useState, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router'
import {useDispatch} from 'react-redux'
import { Menu, MenuItem, Typography, Toolbar, AppBar, Box, Button, IconButton } from '@mui/material'
import {Link } from 'react-router-dom'
import  Avatar from './Avatar.jsx'
import TaskForm from '../TaskForm/TaskForm.jsx'

function Navbar(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    useEffect(() =>{
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location, dispatch]);
    return(
        <AppBar position="sticky" variant="dense">
	    <Toolbar>
	        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
                    <MenuItem key="UKG" onClick={() => {navigate("/")}}>
                        <Typography variant="h6" textAlign="center">UKG</Typography>
                    </MenuItem>
	        </Box>
	        {
		    user===null ? (
			<Button component={Link} to={"/login"} variant="contained" color="primary">Sign In</Button>
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
