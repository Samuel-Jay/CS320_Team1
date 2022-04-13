import React, {useState} from 'react'
import { Menu, MenuItem, Typography, Toolbar, AppBar, Box, Button, Avatar, IconButton } from '@mui/material'
import {Link } from 'react-router-dom'
import {useNavigate, useLocation} from 'react-router'
import {useDispatch} from 'react-redux'

function Avatar(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [showUserMenu, setShowUserMenu] = useState(null);
    function handleShowUserMenu(e){
        setShowUserMenu(e.currentTarget);
    }
    function handleCloseUserMenu(){
        setShowUserMenu(null);
    }

    function stringToColor(string) {
        let hash = 0;
        let i;
        for (i = 0; i < string.length; i += 1) {
	    hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (i = 0; i < 3; i += 1) {
	    const value = (hash >> (i * 8)) & 0xff;
	    color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    }
    function stringAvatar(name) {
        return {
	    sx: {
	        bgcolor: stringToColor(name),
	    },
	    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    function signout(){
        dispatch({type: "LOGOUT", data: null});
        navigate("/");
    }
    return(
        <>
	    <IconButton onClick={handleShowUserMenu}>
	        {
		    <Avatar {...stringAvatar(`${user?.user.firstName} ${user?.user.lastName}`)} />
	        }
	    </IconButton>
	    <Menu sx={{ mt: '45px' }}
	          id="menu-appbar"
	          anchorEl={showUserMenu}
	          anchorOrigin={{
		      vertical: 'top',
		      horizontal: 'right',
	          }}
	          keepMounted
	          transformOrigin={{
		      vertical: 'top',
		      horizontal: 'right',
	          }}
	          open={Boolean(showUserMenu)}
	          onClose={handleCloseUserMenu}
	    >
	        <MenuItem key="Home" component={Link} to={"/"}>
		    <Typography textAlign="center">Home</Typography>
	        </MenuItem>
	        <MenuItem key="Logout" onClick={signout}>
		    <Typography textAlign="center">Sign Out</Typography>
	        </MenuItem>
	    </Menu>
        </>
    )
}

export default Avatar 
