import { Paper, Button, TextField, Grid, Box, Typography} from '@mui/material'
import {useState} from 'react'
import Input from './Input.jsx'
import logo from './img/logo.png'

export function Auth(){
	const [isSignup, setIsSignup] = useState(true)
	const [showPassword, setShowPassword] = useState(false)
	function handleSubmit(){
		if(isSignup){
		}else{
		}
	}

	function toggleSignup(){
		setIsSignup((prevState) => !prevState);
	}
	function toggleShowPassword(){
		setShowPassword((prevState) => !prevState);
	}
	return(
		<form onSubmit={handleSubmit}>
			<Grid container spacing={0}
				  alignItems="center"
				  justifyContent="center"
				  direction="column"
				  style={{minHeight: '100vh' }}>

				<Paper elevation={3} >
					<Box p={3}>
						<Grid container spacing={2} aign="center" justifyContent="center" direction="collumn">
							<img src={logo} alt={logo} width={100} height={100} align="center"/>
						</Grid>
						<Typography align="center" variant="h5">{isSignup ? "Sign Up" : "Sign in"}</Typography>
						{isSignup &&(
							<>
								<Grid container >
									<TextField name="firstname" label="first name" half />
									<TextField name="lastname" label="last name" half />
								</Grid>
							</>
						)}
						<Grid>
							<Input name="email" label="email" />
							<Input name="password" label="password" type={showPassword?"text":"password"} handleShowPassword={toggleShowPassword}/>
						</Grid>
						<div/>
						<Button align="center" variant="contained" fullWidth on>{isSignup?"Sign Up": "Sign In"}</Button>
						<Button algin="center" onClick={toggleSignup}>{isSignup? "Already have an account? Sign in":"Don't have an account? Sign up"}</Button>
					</Box>
				</Paper>
			</Grid>
		</form>
	)
}
