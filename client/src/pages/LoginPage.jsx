import { useState,useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../UserContext"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setUserInfo } = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)
    const navigate = useNavigate();





    async function login(e) {
        e.preventDefault()
        const response = await fetch("http://localhost:9000/login", {
            method: "POST",
            body: JSON.stringify({ username, password, email }),
            headers: {"Content-Type": "application/json"},
            credentials:"include"
        })
 
        if((response).ok){
            response.json().then(userInfo=>{
                console.log('reem', userInfo);
                setUserInfo(userInfo)
                setRedirect(true)
            })

        }else {
            alert("login page,wrong credentials")
        }
    }

    // if redirect is true,redirect to homepage from loginpage
    if(redirect){
        return navigate("/")
    }
    

    return (
        <form className="login-page" onSubmit={login}>

            <h1>Login</h1>

            <input type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />

            <input type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />

            <input type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            <button className="btn">Login</button>
        </form>
    );
}

export default LoginPage;