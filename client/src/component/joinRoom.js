import { useState } from "react";

import { io } from "socket.io-client";
const socket = io("http://localhost:9000");
const JoinRoom = (props) => {
  const [room, setRoom] = useState("");

  return <>Hi</>;
};
export default JoinRoom;
