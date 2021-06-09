import { FC, useEffect, useState } from "react";
import { getTypeParameterOwner, isTemplateExpression } from "typescript";
import GameBoard from "../gameboard";

interface IMove {
  selectedMoveOptions?: {
    x: number;
    y: number;
  }[];
}

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

// interface IMoveableSpaces {
//   moveableSpaces?: string[];
// }

// interface ISelectedPiece {
//   selectedPiece?: string;
// }

const OfflineMode: FC = (): JSX.Element => {
  const [gameState, setGameState] = useState<IGameState>({
    board: {
      a1: { type: "1pawn", player: 1 },
      b1: { type: "1pawn", player: 1 },
      c1: { type: "1king", player: 1 },
      d1: { type: "1pawn", player: 1 },
      e1: { type: "1pawn", player: 1 },
      a5: { type: "pawn", player: 2 },
      b5: { type: "pawn", player: 2 },
      c5: { type: "king", player: 2 },
      d5: { type: "pawn", player: 2 },
      e5: { type: "pawn", player: 2 },
    },
    currentPlayer: 1,
  });

  const [selectedMove, setSelectedMove] = useState<IMove>({
    selectedMoveOptions: [
      { x: 1, y: 1 },
      { x: 0, y: 2 },
    ],
  });

  const [selectedPiece, setSelectedPiece] = useState<string>();
  const [moveableSpaces, setMoveableSpaces] = useState<Array<string>>();

  const addToChar = (c: string, n: number) => {
    return String.fromCharCode(c.charCodeAt(0) + n);
  };

  const removeFromChar = (c: string, n: number) => {
    return String.fromCharCode(c.charCodeAt(0) - n);
  };

  useEffect(() => {
    if (!selectedPiece) return;
    if (!selectedMove?.selectedMoveOptions) return;

    const moveableSpaces = selectedMove?.selectedMoveOptions.map((move) => {
      let moveableSpace;
      if (gameState.currentPlayer === 1) {
        moveableSpace =
          addToChar(selectedPiece[0], move.x) +
          (Number(selectedPiece[1]) + move.y).toString();
      } else {
        moveableSpace =
          removeFromChar(selectedPiece[0], move.x) +
          (Number(selectedPiece[1]) - move.y).toString();
      }

      return moveableSpace;
    });

    setMoveableSpaces(moveableSpaces);
  }, [selectedMove, selectedPiece]);

  // choseMoveLocation is the allowable space that was clicked for the piece to move. ie "a2" or "b3" etc
  const handleMove = (chosenMoveLocation: string) => {
    if (!selectedPiece) return;
    if (!gameState.board) return;
    const pieceInfo = gameState.board[selectedPiece];

    // selectedPiece is State that houses a string of the current toggled piece. ie "a1" or "c1" etc
    const {
      [selectedPiece]: value,
      ...boardStateWithoutSelected
    } = gameState.board;
    const newBoardState = { [chosenMoveLocation]: { ...pieceInfo } };

    const newCurrentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
    setGameState({
      ...gameState,
      currentPlayer: newCurrentPlayer,
      board: { ...boardStateWithoutSelected, ...newBoardState },
    });
    setSelectedPiece("");
    setMoveableSpaces([]);
  };

  return (
    <div>
      <div
        className={
          (gameState.currentPlayer === 1 ? "text-green-500" : "text-blue-500") +
          " font-bold"
        }
      >
        Player {gameState.currentPlayer}
      </div>
      <GameBoard
        gameState={gameState}
        setGameState={setGameState}
        setSelectedPiece={setSelectedPiece}
        handleMove={handleMove}
        selectedPiece={selectedPiece}
        moveableSpaces={moveableSpaces}
      />
    </div>
  );
};

export default OfflineMode;
