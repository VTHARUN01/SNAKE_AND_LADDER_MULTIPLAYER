import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "green",
      }}
    >
      <button
        className="btn btn-primary mx-3"
        onClick={() => navigate("/signIn")}
      >
        Register
      </button>
      <button
        className="btn btn-primary mx-3"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </div>
  );
};

export default Home;
