import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/auth/register", {
        username,
        email,
        password,
      })
      .then(() => {
        setUsername("");
        setPassword("");
        setEmail("");
        navigate("/login");
      })
      .catch((e) => {
        console.log(e);
        alert("ENTER VALID DATA");
        window.location.reload();
      });
  };
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green",
      }}
    >
      <form method="post" onSubmit={handleSubmit}>
        <div className="my-3">
          <input
            name="username"
            placeholder="Enter Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="off"
          />
        </div>
        <div className="my-3">
          <input
            name="email"
            placeholder="Enter email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="my-3">
          <input
            name="password"
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary">Register</button>
      </form>
      <div className="mx-3">
        Have an account
        <div className="mt-3">
          <button
            className="btn btn-primary mx-3"
            onClick={() => navigate("/login")}
          >
            {" "}
            LogIn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
