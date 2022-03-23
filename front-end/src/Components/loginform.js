import React,{useState} from 'react'

function LoginForm({Login,error}) {
    const [details,setDetails] = useState({name:"",email:"",password:""});
    const submitHandler = e =>{
        e.preventDefault();
        Login(details)
    }
  return (
    <form onClick = {submitHandler}>
        < div className='inner-form'>
            {/*Error*/}
            <div className='form-group'>
                <label htmlFor ="email">Email:</label>
                <input type = "email" name = "email" id = "email" onChange= {e => setDetails({...details,email :e.target.value})}></input>
            </div>
            <div className='form-group'>
                <label htmlFor ="password">password:</label>
                <input type = "password" name = "password" id = "password" onChange= {e => setDetails({...details,password:e.target.value})}></input>
            </div>
            <input type = 'submit' value="login"></input>
        </div>
    </form>
  )
} 

export default LoginForm