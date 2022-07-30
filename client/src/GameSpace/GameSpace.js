import Dice from "../Dice/Dice";
import { colorCode } from "../shared/data";
import "./GameSpace.css";
const GameSpace = (props) => {
  return (
    <>
      {!props.gameStarted ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="text-primary"
        >
          <h4 className="my-5"> Waiting for other player to join the room</h4>
          <div className="loader"></div>
        </div>
      ) : (
        <div style={{ display: "flex" }} className="mt-5">
          <div>
            <div style={{ display: "flex", margin: "5px" }}>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: colorCode[props.playerNumber - 1],
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
                <h6 style={{ color: colorCode[props.playerNumber - 1] }}>
                  YOU
                </h6>
              </div>
            </div>
            <div style={{ display: "flex", margin: "5px" }}>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor:
                    colorCode[props.playerNumber % colorCode.length],
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
                <h6
                  style={{
                    color: colorCode[props.playerNumber % colorCode.length],
                  }}
                >
                  OPPONENT
                </h6>
              </div>
            </div>
            <div style={{ marginLeft: "40px" }} className="mt-5">
              <Dice DiceValue={props.diceValue} />
              {props.userActive ? (
                <button
                  onClick={() => {
                    const value = props.DiceRoll();
                    props.setDiceValue(value);
                    props.UpdateBoard(value);
                  }}
                  className="btn btn-info text-white mt-2"
                >
                  Roll
                </button>
              ) : (
                <div className="mt-3">
                  <h6 className="mb-2 text-primary">Waiting</h6>
                  <div
                    className="loader"
                    style={{ width: "20px", height: "20px" }}
                  ></div>
                </div>
              )}
            </div>
          </div>
          <div>
            {props.boardCell.map((BoardCell, index) => (
              <div
                style={{
                  display: "flex",
                  marginLeft: "4px",
                }}
                key={index}
              >
                {BoardCell.map((Cell) => (
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      border: "1px solid #ffc107",
                      display: "flex",
                      borderRadius: "4px",
                      flexDirection: "column",
                      alignItems: "center",
                      fontSize: "10px",
                      color: "#198754",
                      fontWeight: "700",
                    }}
                    key={Cell.id}
                  >
                    <div>
                      {Cell.id}
                      {Cell?.move ? (
                        <span style={{ color: "#dc3545" }}>
                          -&gt;{Cell?.move}
                        </span>
                      ) : null}
                    </div>
                    {Cell.player.length !== 0 ? (
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          border: "1px solid #",
                          borderRadius: "50%",
                          backgroundColor:
                            colorCode[Cell.player[Cell.player.length - 1] - 1],
                        }}
                      ></div>
                    ) : null}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default GameSpace;
