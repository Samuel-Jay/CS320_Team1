import React,{useState} from 'react';
import LoginForm from './Components/loginform';
function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123"
  }
  const [user,setUser] = useState({email:""});
  const [error,setError] = useState("");
  const Login = details => {
    if(details.email === adminUser.email && details.password === adminUser.password){
      console.log("logged in");
      setUser({
        email:details.email
      });
    }
    else{
    console.log("not logged in");
    }
  }
  const Logout = () =>{
    setUser({email:""});
  }
  return (
    <div className="App">
      {(user.email !="")?
      ( <div className= "welcome">
        <h3>Welcome,<span>{user.email}</span></h3>
        <button onClick={Logout}>logout</button>
      </div>
      ):( <><img className='profile-pic'></img><h3>Our Purpose is People</h3><LoginForm Login={Login} error={error} /></>)}
    </div>
  );
}

export default App;
