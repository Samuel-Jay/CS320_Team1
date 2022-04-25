import { Paper, Button, Grid, Box, Typography} from '@mui/material'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import logo from '../Auth/img/logo.png'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {signout} from '../../actions/User.js'

function Home(){
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	console.log("user is")
	console.log(user);

	function handleClick(){
		dispatch(signout());
		setUser(null);
	}

	return(
		<Grid container spacing={0}
			  alignItems="center"
			  justifyContent="center"
			  direction="column"
			  style={{minHeight: '100vh' }}>

			<Paper elevation={3} >
				<Box p={3}>
					{user === null?(
						<Button component={Link} to={"/login"} variant="contained" sx={{'&:hover':{bgcolor:"#20B3A7"}}} color="primary">Sign In</Button>
					):(
						<>
							<Typography>
								Welcome {user.firstName} {user.lastName}
							</Typography>
							<Button onClick={handleClick}>sign out</Button>
						</>
					)}
				</Box>
			</Paper>
		</Grid>
	)
}

export default Home
