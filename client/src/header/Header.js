import React from "react";
import cfi from "../images/cfi.png";
import cfilogo from "../images/CFI Logo (with text) - Black.png";
const Header = () => {
  return (
    <div style={{ position: "absolute" }}>
      <img
        src={cfi}
        alt="cfi logo"
        width="100px"
        style={{ position: "fixed", top: "0px", left: "0px" }}
      />
      <img
        src={cfilogo}
        alt="cfi logo"
        width="100px"
        style={{ position: "fixed", top: "5px", right: "15px" }}
      />
    </div>
  );
};

export default Header;
