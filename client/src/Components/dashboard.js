import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
    const navigate=useNavigate();
    const [quote,setquote]=useState("");
    const [updateQ,setUpdateQ]=useState("");
    let generateQuote=async ()=>{
         const response=await fetch("http://localhost:8888/api/quote",{
            headers:{
                'x-access-token':localStorage.getItem("token")
            }
         })
         const data=await response.json();
         if (data.status === 'ok') {
            setquote(data.quote);
            setUpdateQ(data.quote)
        }
         console.log(data);
    }

    let updateQuote=async ()=>{
        if(updateQ==="") return;
        const response=await fetch("http://localhost:8888/api/quote",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'x-access-token':localStorage.getItem("token")
            },
            body:JSON.stringify({quote:updateQ})
        })
        const data=await response.json();
       if (data.status === 'ok') {
            setquote(updateQ);
        }
        console.log(data);
    }
    useEffect(()=>{
        let token=localStorage.getItem("token");
        if(token){
            const payload = JSON.parse(atob(token.split('.')[1]));
            if(payload.name){
                console.log(payload.name)
                generateQuote();
            }else{
                navigate("/");
            }
        }
    },[navigate])
    return(
        <>
            <h1>Your Quote is {quote}</h1>

            <textarea rows="4" cols="50" value={updateQ} onChange={(e)=>setUpdateQ(e.target.value)}>
                Update Your Quote
            </textarea>
            <br/>
            <button onClick={()=>updateQuote()}>Click To Change Your Quote</button>
        </>
    )
}