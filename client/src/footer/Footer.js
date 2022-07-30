import React from "react";

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
          Developed by
          <a
            className="mx-1"
            style={{ textDecoration: "none", color: "inherit" }}
            href="mailto:v.tharun2589@gmail.com"
          >
            Tharun.V
          </a>
          ,
          <a
            className="mx-1"
            style={{ textDecoration: "none", color: "inherit" }}
            href="mailto:dheeraj.s.kumar14@gmail.com"
          >
            Dheeraj Kumar
          </a>
          and
          <a
            className="mx-1"
            style={{ textDecoration: "none", color: "inherit" }}
            href="mailto:gudipudirasagnya@gmail.com"
          >
            Rasagnya
          </a>
          of
          <a
            className="mx-1"
            style={{ textDecoration: "none", color: "inherit" }}
            href="mailto:webopsandblockchainclub@gmail.com"
          >
            WebOps And Blockchain Club
          </a>
          , CFI
        </h1>
      </div>
    </div>
  );
};

export default Footer;
