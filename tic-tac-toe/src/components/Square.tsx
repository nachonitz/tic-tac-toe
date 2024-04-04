import { Values } from "../models/Values";
import { RxCircle, RxCross1 } from "react-icons/rx";

interface Props {
  value?: Values;
  onClick: () => void;
  nextPlayer: Values;
}

const Square = ({ value, onClick, nextPlayer }: Props) => {
  const handleClick = () => {
    if (!value) {
      onClick();
    }
  };
  return (
    <div
      onClick={handleClick}
      className={`${!value && " cursor-pointer "} ${
        !value && nextPlayer === Values.X && "hover:bg-playerX "
      } ${
        !value && nextPlayer === Values.O && "hover:bg-playerO"
      } bg-[#eee] select-none rounded-[4px]  transition-color duration-500 flex justify-center items-center`}
    >
      {value === Values.X && (
        <span className="text-3xl text-playerX">
          <RxCross1 />
        </span>
      )}
      {value === Values.O && (
        <span className="text-3xl text-playerO">
          <RxCircle />
        </span>
      )}
    </div>
  );
};

export default Square;
