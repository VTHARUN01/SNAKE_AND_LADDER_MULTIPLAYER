import "./Room.css";

const Room = (props) => {
  return (
    <div className="outer_div">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (props.roomId.trim() !== "" && props.roomId && props.socket) {
            props.socket.emit("join_room", { roomId: props.roomId });
            props.socket.on("room_joined", (data) => {
              if (!data) {
                alert("Can't join this Room");
                window.location.reload();
              }
              props.setJoinedRoom(data);
            });
          }
        }}
      >
        <h4 className="text-center text-primary"> Room ID </h4>
        <input
          className="my-3 form-control"
          onChange={(e) => props.setRoomId(e.target.value)}
          required
          value={props.roomId}
        />
        <button className="btn btn-primary">Join Room</button>
      </form>
    </div>
  );
};

export default Room;
