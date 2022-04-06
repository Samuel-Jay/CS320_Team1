import './App.css';
import Auth from './components/Auth/Auth.jsx'
import Home from './components/Home/Home.jsx'
<<<<<<< HEAD
import Searchbar from './components/Searchbar/Searchbar.jsx'
=======
import Navbar from './components/Navbar/Navbar.jsx'
import Task_row from './components/Task/src/Task_row.jsx'
>>>>>>> c84d74cd565916176b3b65741c60d89f35254649
import background from './styles/img/background.png'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
	return (
			<BrowserRouter>
				<div style = {{width: '100%', height: '100%', backgroundImage: `url(${background})`}}>
					<Routes>
						<Route path="/" element = {<Task_row/>}/>
						<Route path="/" element={<Home/>} />
						<Route path="/login" element={<Auth/>} />
						<Route path="/searchbar" element={<Searchbar/>} />
					</Routes>
				</ div>
			</BrowserRouter>
	);
				}

export default App;
