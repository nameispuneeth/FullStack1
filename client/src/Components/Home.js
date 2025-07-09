import { useNavigate } from "react-router-dom";

export default function Home(){
    const navigate=useNavigate()
    return(
        <>
            <h1 onClick={()=>navigate("/login")}>Login</h1>
            <br/>
            <h1 onClick={()=>navigate("/register")}>SignUp</h1>
        </>
    );
}