import { useState } from "react";
import { useNavigate } from "react-router-dom"

const RegisterPage = () => {
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false)

    
    async function signup(e){
        e.preventDefault()
        const response=fetch("http://localhost:9000/signup",{
            method:"POST",
            body:JSON.stringify({username,password,email}),
            headers:{
                "Content-Type":"application/json",
            },
            credentials:"include"
        })
        setRedirect(true)

    }

    if(redirect){
        return navigate("/")
    }

    return ( 
        <form className="signup-page" onSubmit={signup}>

            <h1>Signup</h1>

            <input type="text"
                   placeholder="username"
                   value={username}
                   onChange={(e)=>setUsername(e.target.value)} />

            <input type="password"
                   placeholder="password"
                   value={password}
                   onChange={(e)=>setPassword(e.target.value)} />


            <input type="email"
                   placeholder="email"
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)} />

                   <button className="btn">Signup</button>
        </form>
     );
}
 
export default RegisterPage;