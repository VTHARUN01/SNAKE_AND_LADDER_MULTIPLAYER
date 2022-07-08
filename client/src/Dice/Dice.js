import dice1 from "../images/1.png";
import dice2 from "../images/2.png";
import dice3 from "../images/3.png";
import dice4 from "../images/4.png";
import dice5 from "../images/5.png";
import dice6 from "../images/6.png";
const Dice = (props) => {
  const dieValue = [dice1, dice2, dice3, dice4, dice5, dice6];
  return (
    <div>
      {props.DiceValue > 0 ? (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img src={dieValue[props.DiceValue - 1]} width="40px" height="40px" />
      ) : null}
    </div>
  );
};

export default Dice;
