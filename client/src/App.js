import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  BoardCell,
  LadderAndSnakes,
  ExtraMove,
  NonExtraMove,
  colorCode,
} from "./shared/data";
import "bootstrap/dist/css/bootstrap.min.css";
import Dice from "./Dice";
const socket = io("http://localhost:9000");
function App() {
  const color = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r},${g},${b})`;
  };
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [playerNumber, setPlayerNumber] = useState("");
  const [diceValue, setDiceValue] = useState(0);
  const DiceRoll = () => Math.floor(Math.random() * 6) + 1;
  const [boardCell, setBoardCell] = useState(BoardCell);
  const [userValue, setUserValue] = useState(1);
  const [userActive, setUserActive] = useState(false);
  const [gameStarted, setGamestarted] = useState(false);
  const [opponentWon, setOpponentWon] = useState(false);
  const UpdateBoard = (diceValue) => {
    const newBoard = [...boardCell];
    let finalScore = userValue + diceValue;
    let finalMove = LadderAndSnakes.find((key) => key.cell === finalScore);
    if (finalMove) {
      finalScore = finalMove.move;
    }
    if (userActive) {
      let score = userValue;
      if (userValue % 10 === 0) {
        score--;
      }
      let Position = Math.round(
        newBoard.length - score / 10 + (score % 10) / 10 - 1
      );
      newBoard[Position].find((cell) => cell.id === userValue).player =
        newBoard[Position].find((cell) => cell.id === userValue)?.player.filter(
          (symbol) => symbol !== playerNumber
        );
      setUserValue(finalScore);
      let Score = finalScore;
      if (finalScore % 10 === 0) {
        Score--;
      }
      let sosition = Math.round(
        newBoard.length - Score / 10 + (Score % 10) / 10 - 1
      );
      newBoard[sosition]
        .find((cell) => cell.id === finalScore)
        .player.push(playerNumber);
      console.log(newBoard[Position]);

      setBoardCell(newBoard);
      if (NonExtraMove.includes(diceValue)) {
        setUserActive(false);
      }
      if (ExtraMove.includes(diceValue)) {
        setUserActive(true);
      }
    }
    if (socket) {
      socket.emit("update_game", {
        newBoard,
        diceroll: diceValue,
        Opponentvalue: finalScore,
      });
    }
  };
  const handleGameUpdate = () => {
    if (socket) {
      socket.on("on_game_update", (data) => {
        setBoardCell(data.newBoard);
        if (ExtraMove.includes(data.diceroll)) {
          setUserActive(false);
        }
        if (NonExtraMove.includes(data.diceroll)) {
          setUserActive(true);
        }
      });
    }
  };
  const handleGameStart = () => {
    if (socket) {
      socket.on("start_game", (data) => {
        setPlayerNumber(data.symbol);
        setUserActive(data.start);
        setGamestarted(true);
      });
    }
  };
  const handleGameWin = () => {
    if (socket && userValue === 100) {
      alert("You Won");
      socket.emit("game_win", true);
    }
  };
  const connect = () => {
    socket.on("connect", () => {
      console.log("Connected to The Server");
    });
  };
  useEffect(() => {
    connect();
    handleGameStart();
    handleGameUpdate();
  }, []);
  useEffect(() => {
    if (userValue === 0) {
      handleGameWin();
      alert("You Won");
      window.location.reload();
    }
    if (socket) {
      socket.on("on_game_won", (data) => {
        setOpponentWon(data);
        alert("Opponent Won");
        window.location.reload();
      });
    }
  }, [boardCell]);
  return (
    <>
      {joinedRoom ? (
        <div>
          {!gameStarted ? (
            <div>Waiting for other player to join the room</div>
          ) : (
            <div style={{ display: "flex" }}>
              <div>
                <div style={{ display: "flex", margin: "5px" }}>
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "1px solid black",
                      borderRadius: "50%",
                      backgroundColor: colorCode[playerNumber - 1],
                    }}
                  ></div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "30px",
                      marginLeft: "4px",
                    }}
                  >
                    <div>YOU</div>
                  </div>
                </div>
                <div style={{ display: "flex", margin: "5px" }}>
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "1px solid black",
                      borderRadius: "50%",
                      backgroundColor:
                        colorCode[playerNumber % colorCode.length],
                    }}
                  ></div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "30px",
                      marginLeft: "4px",
                    }}
                  >
                    <div>OPPONENT</div>
                  </div>
                </div>
              </div>
              <div>
                {boardCell.map((BoardCell, index) => (
                  <div
                    style={{
                      display: "flex",
                    }}
                    key={index}
                  >
                    {BoardCell.map((Cell) => (
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          border: "1px solid black",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          backgroundColor: color(),
                        }}
                        key={Cell.id}
                      >
                        <div>
                          {Cell.id}
                          {Cell?.move ? <span>-&gt;{Cell?.move}</span> : null}
                        </div>
                        {Cell.player.length !== 0 ? (
                          <div
                            style={{
                              width: "30px",
                              height: "30px",
                              border: "1px solid black",
                              borderRadius: "50%",
                              backgroundColor:
                                colorCode[
                                  Cell.player[Cell.player.length - 1] - 1
                                ],
                            }}
                          ></div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div style={{ marginLeft: "20px" }}>
                <Dice DiceValue={diceValue} />
                {userActive ? (
                  <button
                    onClick={() => {
                      const value = DiceRoll();
                      setDiceValue(value);
                      UpdateBoard(value);
                    }}
                  >
                    Roll
                  </button>
                ) : (
                  <div>Waiting for Oponnet to Roll</div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (roomId.trim() !== "" && roomId && socket) {
              socket.emit("join_room", { roomId });
              socket.on("room_joined", (data) => {
                if (!data) {
                  alert("Can't join this Room");
                  window.location.reload();
                }
                setJoinedRoom(data);
              });
            }
          }}
        >
          <h4> Room ID </h4>
          <input
           type="number"
            onChange={(e) => setRoomId(e.target.value)}
            required
            value={roomId}
          />
          <button>Join Room</button>
        </form>
      )}
    </>
  );
}

export default App;
