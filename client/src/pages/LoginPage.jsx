import { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/login-signup.css";
import { API_URL } from "../constants";
// import Loading from "../loading";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
// const [loading,setLoading]=useState(true)
  async function login(e) {
    e.preventDefault();
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password, email }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("wrong credentials");
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
          <p><strong>Demo Account</strong> username: test password: test email: test@gmail.com</p>
          <p><strong>Admin Account</strong> username: admin password: admin email :admin@gmail.com</p>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="btn">Login</button>

          <p>
            Don't have an account?{" "}
            <button onClick={() => navigate("/signup")}>Create one</button>{" "}
          </p>
        </div>
      </form>

     
  );
};

export default LoginPage;
