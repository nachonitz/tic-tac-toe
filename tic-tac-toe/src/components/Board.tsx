import { useEffect, useState } from "react";
import Square from "./Square";
import { Values } from "../models/Values";

export interface Props {
  setWinner: (winner: string) => void;
  setDraw: (draw: boolean) => void;
  winner: string | null;
  draw: boolean;
}

const Board = ({ setWinner, winner, setDraw, draw }: Props) => {
  const [squares, setSquares] = useState<Values[]>(Array(9).fill(null));
  const [nextPlayer, setNextPlayer] = useState<Values>(Values.X);
  const [winningLine, setWinningLine] = useState<number[]>([]);

  const clearBoard = () => {
    setSquares(Array(9).fill(null));
    setWinningLine([]);
    setNextPlayer(Values.X);
  };

  useEffect(() => {
    if (!winner) {
      clearBoard();
    }
  }, [winner]);

  useEffect(() => {
    if (!draw) {
      clearBoard();
    }
  }, [draw]);

  function calculateWinner(squares: Array<Values>) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setWinningLine(lines[i]);
        return squares[a];
      }
    }
    if (squares.every((square) => square !== null)) {
      setDraw(true);
      return null;
    }
    return null;
  }

  function handleClick(i: number) {
    if (winner) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = nextPlayer;
    let newNextPlayer = nextPlayer === Values.X ? Values.O : Values.X;
    setSquares(newSquares);
    let newWinner = calculateWinner(newSquares);
    if (newWinner) {
      setWinner(newWinner === Values.X ? "Player X" : "Player O");
      return;
    } else {
      setNextPlayer(newNextPlayer);
    }
  }

  function getRotation(): number {
    if (winningLine.length !== 3) {
      return 0;
    }

    const [a, , c] = winningLine;
    if (a === 0 && c === 2) {
      return 0; // Horizontal line
    } else if (a === 3 && c === 5) {
      return 0; // Horizontal line
    } else if (a === 0 && c === 8) {
      return 45; // Diagonal line from top-left to bottom-right
    } else if (a === 2 && c === 6) {
      return -45; // Diagonal line from top-right to bottom-left
    } else if (a === 6 && c === 8) {
      return 0; // Horizontal line
    } else {
      return 90; // Default to Vertical line
    }
  }

  function calculateTop(winningLine: number[]): string {
    let rotation = getRotation();
    const row = Math.floor(winningLine[0] / 3);
    // return `calc(${row * (100 / 3)}% + 35px + ${row}*3px)`;
    if (rotation === 0) {
      return `calc(${row * (100 / 3)}% + 37px + ${row}*3px)`;
    } else if (rotation === 45) {
      return "35px";
    } else if (rotation === -45) {
      return "calc(100% - 39px)";
    } else {
      return "0px";
    }
  }

  function calculateLeft(winningLine: number[]): string {
    let rotation = getRotation();
    const col = winningLine[0] % 3;
    console.log(col, winningLine);
    console.log(col * (100 / 3));
    // return `10px`;
    if (rotation === 90) {
      return `calc(${col * (100 / 3)}% + 41px + ${col}*3px)`;
    } else if (rotation === 45 || rotation === -45) {
      return "37px";
    } else {
      return "0";
    }
  }

  return (
    <>
      <div className="relative w-64 h-64 grid grid-cols-3 grid-rows-3 gap-2">
        {squares.map((square, i) => (
          <Square
            key={i}
            value={square}
            onClick={() => handleClick(i)}
            nextPlayer={nextPlayer}
          />
        ))}
        {winner && winningLine.length > 0 && (
          <div
            className="absolute w-full h-full"
            style={{
              transform: `rotate(${getRotation()}deg)`,
              top: calculateTop(winningLine),
              left: calculateLeft(winningLine),
              transformOrigin: "top left",
            }}
          >
            <div
              className={`${
                winner === "Player X" ? "bg-playerX" : "bg-playerO"
              } writing relative brightness-95`}
              style={{
                width: "100%",
                height: "3px",
                zIndex: 2,
              }}
            ></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Board;
