import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Room from "./Room/Room";
import GameSpace from "./GameSpace/GameSpace";
import {
  BoardCell,
  LadderAndSnakes,
  ExtraMove,
  NonExtraMove,
} from "./shared/data";
import "bootstrap/dist/css/bootstrap.min.css";
const socket = io("http://localhost:9000");
function App() {
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [playerNumber, setPlayerNumber] = useState("");
  const [diceValue, setDiceValue] = useState(0);
  const [boardCell, setBoardCell] = useState(BoardCell);
  const [userValue, setUserValue] = useState(1);
  const [userActive, setUserActive] = useState(false);
  const [gameStarted, setGamestarted] = useState(false);
  const DiceRoll = () => Math.floor(Math.random() * 6) + 1;
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

  return (
    <>
      {joinedRoom ? (
        <GameSpace
          gameStarted={gameStarted}
          diceValue={diceValue}
          playerNumber={playerNumber}
          boardCell={boardCell}
          DiceRoll={DiceRoll}
          userActive={userActive}
          setDiceValue={setDiceValue}
          UpdateBoard={UpdateBoard}
        />
      ) : (
        <Room
          socket={socket}
          roomId={roomId}
          setJoinedRoom={setJoinedRoom}
          setRoomId={setRoomId}
        />
      )}
    </>
  );
}

export default App;
