import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom"
import "../styles/login-signup.css"

const RegisterPage = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false)


    async function signup(e) {
        e.preventDefault()
        const response = fetch("http://localhost:9000/signup", {
            method: "POST",
            body: JSON.stringify({ username, password, email }),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
        setRedirect(true)

    }

    useEffect(() => {
        if (redirect) {
          navigate("/");
        }
      }, [redirect, navigate]);

    return (
        <form className="signup-page" onSubmit={signup}>

            <h1 className="title-large center">Signup</h1>
            <div>
                <p>Please fill in the information below:</p>
                
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
                    required/>

                <button className="btn">Signup</button>
            </div>

        </form>
    );
}

export default RegisterPage;