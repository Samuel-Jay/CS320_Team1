import './App.css';
import Auth from './components/Auth/Auth.jsx'
import Home from './components/Home/Home.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Task_row from './components/Task/src/Task_row.jsx'
import Window from './components/Window/Window.jsx'
import background from './styles/img/background.png'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Grid} from '@mui/material';



const themeLight = createTheme({
    palette: {
        background: {
            default: "#30cebb"
        }
    },
});

function App() {
    return (
	<BrowserRouter>
	    <div style = {{width: '100%', height: '100%', backgroundImage: `url(${background})`}}>
                <Navbar/>
		<Routes>
		    <Route path="/" element = {
                               <>
                                   <Task_row/>
                                   <Window/>
                               /</>
                           }/>
		    <Route path="/login" element={<Auth/>} />
		    </Routes>
	    </ div>

	</BrowserRouter>
    );
}

export default App;
