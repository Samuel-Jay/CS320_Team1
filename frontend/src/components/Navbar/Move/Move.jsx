import React, {useState, useEffect} from 'react';
import { Link, Menu, MenuItem, Typography, Toolbar, AppBar, Box, Button, Avatar, IconButton } from '@mui/material'
import "./index.css";
import {useDispatch, useSelector} from 'react-redux';
import {moveTask} from '../../../actions/Task.js';


export default function MoveButton() {

    const dispatch = useDispatch();

    const [showUserMenu, setShowUserMenu] = useState(null);
    function handleShowUserMenu(e){
        setShowUserMenu(e.currentTarget);
    }
    function handleCloseUserMenu(){
        setShowUserMenu(null);
    }

    function move(e){
        dispatch(moveTask(e));
    }

    return(
        <div>
            <Button  variant="contained" sx={{backgroundColor: '#005151', '&:hover':{bgcolor:"#20B3A7"}, m:2}}  onClick={handleShowUserMenu}>
                Move
            </Button>
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
	        <MenuItem key="Incomplete" value="Incomplete" onClick={() => move("Incomplete")}>
		    <Typography textAlign="center">Incomplete</Typography>
	        </MenuItem>
	        <MenuItem key="Completed" value="Completed" onClick = {() =>move("Completed")}>
		    <Typography textAlign="center">Completed</Typography>
	        </MenuItem>
	        <MenuItem key="Archived" value="Archived" onClick={() => move("Archived")}>
		    <Typography textAlign="center">Archived</Typography>
	        </MenuItem>
	    </Menu>
        </div>


    )
}
