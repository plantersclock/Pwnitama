import { FC } from "react";
import Square from "./Square";

const board = [
  "a5",
  "b5",
  "c5",
  "d5",
  "e5",
  "a4",
  "b4",
  "c4",
  "d4",
  "e4",
  "a3",
  "b3",
  "c3",
  "d3",
  "e3",
  "a2",
  "b2",
  "c2",
  "d2",
  "e2",
  "a1",
  "b1",
  "c1",
  "d1",
  "e1",
];

interface IPiece {
  type: string;
  player: number;
}

interface IBoardState {
  [p: string]: IPiece;
}

interface IGameState {
  board: IBoardState;
  currentPlayer: number;
}

interface IProps {
  gameState: IGameState;
  selectedPiece?: string;
  moveableSpaces?: any;
  setGameState: (value: any) => void | undefined;
  setSelectedPiece: (value: any) => void | undefined;
  handleMove: (value: any) => void | undefined;
}

const GameBoard: FC<IProps> = ({
  gameState,
  selectedPiece,
  setGameState,
  setSelectedPiece,
  moveableSpaces,
  handleMove,
}) => {
  console.log(gameState);

  return (
    <div
      className="grid grid-cols-5 mx-auto"
      style={
        gameState.currentPlayer === 1 ? {} : { transform: "rotate(180deg)" }
      }
    >
      {board.map((square) => {
        return (
          <Square
            key={square}
            space={square}
            squareState={gameState.board[square]}
            setSelectedPiece={setSelectedPiece}
            selectedPiece={selectedPiece}
            moveableSpaces={moveableSpaces}
            handleMove={handleMove}
            currentPlayer={gameState.currentPlayer}
          />
        );
      })}
    </div>
  );
};

export default GameBoard;
