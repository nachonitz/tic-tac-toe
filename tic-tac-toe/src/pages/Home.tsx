import { useState } from "react";
import Board from "../components/Board";

const Home = () => {
  const [winner, setWinner] = useState<string | null>(null);
  const [draw, setDraw] = useState<boolean>(false);
  const handleWinner = (winner: string) => {
    setWinner(winner);
    console.log(winner);
  };

  const handlePlayAgain = () => {
    setDraw(false);
    setWinner(null);
  };
  return (
    <div className="min-h-[100vh] pt-4 w-full flex justify-center">
      <div className="flex flex-col gap-[20px]">
        <div className="text-4xl text-center text-white">Tic Tac Toe</div>
        <Board
          setDraw={setDraw}
          draw={draw}
          setWinner={handleWinner}
          winner={winner}
        />
        {(winner || draw) && (
          <div className="flex flex-col items-center gap-4">
            {!draw && (
              <div className="text-white text-[22px]">
                <span>Winner: Player </span>
                <span
                  className={`${
                    winner === "Player X" ? "text-playerX" : "text-playerO"
                  }`}
                >
                  {winner === "Player X" ? "X" : "O"}
                </span>
              </div>
            )}
            {draw && <div className="text-white text-[22px]">It's a Draw</div>}
            <div className="flex w-full justify-center">
              <button
                onClick={handlePlayAgain}
                className="z-[1] px-4 py-2 border border-white rounded-[4px] text-white text-[20px] hover:bg-white hover:text-[#282c34] transition-colors duration-300"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
