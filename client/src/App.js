import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Room from "./Room/Room";
import GameSpace from "./GameSpace/GameSpace";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import {
  BoardCell,
  LadderAndSnakes,
  ExtraMove,
  NonExtraMove,
} from "./shared/data";
import "bootstrap/dist/css/bootstrap.min.css";
const socket = io("https://safe-river-93823.herokuapp.com/");
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
      //To access postion in board
      let Position = Math.round(
        newBoard.length - score / 10 + (score % 10) / 10 - 1
      );
      // To filter the previous position
      newBoard[Position].find((cell) => cell.id === userValue).player =
        newBoard[Position].find((cell) => cell.id === userValue)?.player.filter(
          (symbol) => symbol !== playerNumber
        );
      //Set value to finall score
      setUserValue(finalScore);
      let Score = finalScore;
      if (finalScore % 10 === 0) {
        Score--;
      }

      //finding postion
      let position = Math.round(
        newBoard.length - Score / 10 + (Score % 10) / 10 - 1
      );

      //Adding player to new poistion
      newBoard[position]
        .find((cell) => cell.id === finalScore)
        .player.push(playerNumber);
      //Setting new Board
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
      });
      if (finalScore === 100 && userActive) {
        alert("You Won!!!");
        window.location.reload();
      }
    }
  };

  const handleGameUpdate = () => {
    if (socket) {
      socket.on("on_game_update", (data) => {
        setBoardCell(data.newBoard);
        if (data.newBoard[0][0].player.length > 0) {
          alert("You lost!!!");
          window.location.reload();
        }
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
      <Header />
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
      <Footer />
    </>
  );
}

export default App;
