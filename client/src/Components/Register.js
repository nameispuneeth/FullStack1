import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Regsiter() {
    const navigate=useNavigate();
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");
  const DataSubmission=async (e)=>{
    e.preventDefault();
    const response=await fetch("http://localhost:8888/api/register",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name,email,password
      })
    })
    const data=await response.json();

    if(data.status==='ok'){
        alert("User Registered");
        navigate('/login')
    }
    else alert (`${data.error}`);
    console.log(data)

  }
  return (
    <div className="App">
      <form onSubmit={DataSubmission}>
        <input type='text' placeholder='Enter Your Name' value={name} onChange={(e)=>setName(e.target.value)}/> <br/><br/>
        <input type='email' placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/> <br/><br/>
        <input type='password' placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)}/> <br/><br/>
        <input type='submit' value="Regsiter"/>
      </form>
    </div>
  );
}

export default Regsiter;
