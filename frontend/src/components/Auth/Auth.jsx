import { Paper, Button, TextField, Grid, Box, Typography} from "@mui/material";
import React, {useState} from "react";
import Input from "./Input.jsx";
import logo from "./img/logo.png";
import {useDispatch} from "react-redux";
import {signin} from "../../actions/User.js";
import {useNavigate} from "react-router-dom";
import {getEmployees} from "../../actions/Task.js";
import background from '../../styles/img/background.png';
  
function Auth(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const [hasFailed, setHasFailed] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 

    const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };
    const [form, setForm] = useState(initialState);

    function handleSubmit(e){
        e.preventDefault();
        if(isSignup){
            console.log(isSignup);
        }else{
            dispatch(signin(form)).then(
                ()=>{
                    if(localStorage.getItem("profile")){
                        dispatch(getEmployees());
                        navigate("/TaskBox");
                    }else{
                        setHasFailed(true);
                    }
                }
            );
        }
    }

    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value});
    }

    function toggleSignup(){
        setIsSignup((prevState) => !prevState);
    }
    function toggleShowPassword(){
        setShowPassword((prevState) => !prevState);
    }
    return(
        <form onSubmit={handleSubmit}>
            <div style = {{width: '100%', height: '100%', backgroundImage: `url(${background})`}}>
            <Grid container spacing={0} alignItems="center" justifyContent="center" style={{minHeight: "100vh" }}>
                <Paper elevation={3} >
                    <Box p={3}>
                        <Grid container spacing={2} aign="center" justifyContent="center">
                            <img src={logo} alt={logo} width={100} height={100} align="center"/>
                        </Grid>
                        <Typography align="center" variant="h5" >{isSignup ? "Sign Up" : "Sign in"}</Typography>
                        {isSignup && (
                            <>
                                <Grid container >
                                    <TextField name="firstname" label="first name" onChange={handleChange} half="true" />
                                    <TextField name="lastname" label="last name" onChange={handleChange} half="true" />
                                </Grid>
                            </>
                        )}
                        <Grid>
                            <Input name="email" label="email" handleChange={handleChange}/>
                            <Input name="password" label="password" type={showPassword?"text":"password"} handleChange={handleChange} handleShowPassword={toggleShowPassword}/>
                        </Grid>
                        {isSignup && (
                            <>
                                <Grid container >
                                    <Input name="confirmPassword" label="repeat password" type={showPassword?"text":"password"} handleChange={handleChange} handleShowPassword={toggleShowPassword}/>
                                </Grid>
                            </>
                        )}
                        <Grid>
                            <div/>
                            <Button type="submit" align="center" variant="contained" style={{background: "#005151" }} fullWidth>{isSignup?"Sign Up": "Sign In"} </Button>
                            <Button align="center" style={{ color: '#005151' }}  onClick={toggleSignup}>{isSignup ? "Already have an account? Sign in":"Don't have an account? Sign up"}</Button>
                            {
                                hasFailed && (
                                    <Typography>Error, invalid login</Typography>
                                )
                            }

                        </Grid>
                    </Box>
                </Paper>
            </Grid>
            </div>
        </form>
    );
}

export default Auth;
