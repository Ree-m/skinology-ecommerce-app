import { useState, useContext ,useEffect} from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../UserContext"
import { useNavigate } from "react-router-dom"
import "../styles/login-signup.css"


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
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })

        if ((response).ok) {
            response.json().then(userInfo => {
                console.log(userInfo);
                setUserInfo(userInfo)
                setRedirect(true)
            })

        } else {
            alert("wrong credentials")
        }
    }

    useEffect(() => {
        if (redirect) {
          navigate("/");
        }
      }, [redirect, navigate]);

    return (
        <form className="login-page" onSubmit={login}>

            <h1 className="title-large center">Login</h1>

            <div>
                <p>Please enter your e-mail and password:</p>
                <input type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />

                <input type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />

                <input type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />

                <button className="btn">Login</button>

                <p>Don't have an account? <button onClick={() => navigate("/signup")}>Create one</button> </p>
            </div>


        </form>
    );
}

export default LoginPage;