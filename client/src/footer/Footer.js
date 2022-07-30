import React from "react";
import cfi from "../images/cfi.png";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div
        className="text-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className="h6 text-center text-danger mx-2 text-white">
          Developed by Students of WebOps And Blockchain Club IIT Madras
        </h1>
        <img src={cfi} width="50px" alt="CFI" />
      </div>
    </div>
  );
};

export default Footer;
