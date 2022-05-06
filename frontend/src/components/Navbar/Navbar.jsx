import React, {useState, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router'
import {useDispatch} from 'react-redux'
import { Menu, MenuItem, Typography, Toolbar, AppBar, Box, Button, IconButton } from '@mui/material'
import {Link } from 'react-router-dom'
import TaskForm from '../TaskForm/TaskForm.jsx'
import AvatarIcon from './AvatarIcon.jsx'
import Move from './Move//Move.jsx'
import iconButton from '@mui/material/IconButton';
import logo from '../../styles/img/logo.png';
import Searchbar from '../Searchbar/Searchbar.jsx'
import { shadows } from '@mui/system';

function Navbar(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    useEffect(() =>{
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location, dispatch]);
    return(
        <AppBar position="sticky" variant="dense" style={{ background: '#199086' }}  sx={{ boxShadow: 2 }}>
	    <Toolbar>
                <img src={logo} width="100" ></img>
                <Searchbar/>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
                </Box>
	        {
		    user===null ? (
			<Button component={Link} to={"/login"} variant="contained" style={{ background: '#005151' }} sx={{'&:hover':{bgcolor:"#20B3A7"}}}>Sign In</Button>
		    ) : (
                        <>
                            <Move/>
                            <TaskForm/>
                            <AvatarIcon/>
                        </>
		    )
	        }
	    </Toolbar>
        </AppBar>
    )
}
export default Navbar;


