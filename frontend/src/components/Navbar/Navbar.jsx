import {useState, useEffect} from 'react';
import {AppBar, Box, Toolbar, Avatar, Button, Typography} from '@mui/material';
import {Link, Routes, Route, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';

const Navbar = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

	console.log(user);

	function logout(){
		dispatch({type: "LOGOUT"});
		setUser(null);
	}

	useEffect(() =>{
		setUser(JSON.parse(localStorage.getItem('profile')));
	}, [location])
	return(
		<>
			<AppBar position="fixed"  variant="dense"
					style={{ background: 'transparent', boxShadow: 'none'}}>
				<Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' } }}>
					<Toolbar>
						{user ? (
							<>
								<Typography>
								</Typography>
							</>
						) :
						 (
							 <>
								 <Routes>
									 <Route path='/' element={<Button component={Link} to={'/login'} variant="contained">Sign in</Button>}/>
									 <Route path='/login' element={<Button component={Link} to={'/'} variant="contained">Home</Button>}/>
								 </Routes>
							 </>
						 )}
					</Toolbar>
				</Box>
			</AppBar>
		</ >
	)
}
export default Navbar;
