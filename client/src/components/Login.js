import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { updateJWT } from "../redux/ActionCreators";
import axios from "axios";
const mapStateToProps = (state) => ({
  JWT: state.JWT,
});
const mapDispatchToProps = (dispatch) => ({
  updateJWT: (data) => dispatch(updateJWT(data)),
});
const Login = (props) => {
  props.joiinedRoom
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/auth/signin", {
        email,
        password,
      })
      .then((response) => {
        props.updateJWT(response.data.token);
        setPassword("");
        setEmail("");
        navigate("/snakeandladder");
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
        <button className="btn btn-primary">Login In</button>
      </form>
      <div className="mx-3">
        Don't have an account
        <div className="mt-3">
          <button
            className="btn btn-primary mx-3"
            onClick={() => navigate("/signIn")}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
