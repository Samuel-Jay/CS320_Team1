import './App.css';
import Auth from './components/Auth/Auth.jsx'
import Home from './components/Home/Home.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import TaskRow from './components/Task/TaskRow.jsx'
import Mailbar from './components/Mailbar/Mailbar.jsx'
import Window from './components/Window/Window.jsx'
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
	    <Routes>
		<Route path="/" element={<Auth/>} />
                <Route path="/TaskBox" element = {
                           <div className='main-body'>
                               <Navbar/>
                               <Mailbar/>
                               <TaskRow/>
                           </div>
                       }/>
	    </Routes>

	</BrowserRouter>
    );
}

export default App;
