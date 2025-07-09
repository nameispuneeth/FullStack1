import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate=useNavigate();
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");
  const DataSubmission=async (e)=>{
    e.preventDefault();
    const response=await fetch("http://localhost:8888/api/login",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email,password
      })
    })

    const data=await response.json();

    if(data.status==='ok'){
        alert("Login Succesfull");
        localStorage.setItem("token",data.userName);
        navigate("/dashboard")
    }else{
        alert('No Data Found');
    }

  }
  return (
    <div className="App">
      <form onSubmit={DataSubmission}>
        <input type='email' placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/> <br/><br/>
        <input type='password' placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)}/> <br/><br/>
        <input type='submit' value="Login"/>
      </form>
    </div>
  );
}

export default Login;
