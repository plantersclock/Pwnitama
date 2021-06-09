import { FC, useMemo, useState } from "react";

import CurrentPlayerCards from "../cards/CurrentPlayerCards";
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

const addToChar = (c: string, n: number) => {
  return String.fromCharCode(c.charCodeAt(0) + n);
};

const removeFromChar = (c: string, n: number) => {
  return String.fromCharCode(c.charCodeAt(0) - n);
};

const getMoveableSpaces = (
  piece: string | undefined,
  player: number,
  moveOptions: IMove["selectedMoveOptions"]
) => {
  if (!piece) return;
  if (!moveOptions) return;

  const moveableSpaces = moveOptions.map((move) => {
    let moveableSpace;
    if (player === 1) {
      moveableSpace =
        addToChar(piece[0], move.x) + (Number(piece[1]) + move.y).toString();
    } else {
      moveableSpace =
        removeFromChar(piece[0], move.x) +
        (Number(piece[1]) - move.y).toString();
    }

    return moveableSpace;
  });
  return moveableSpaces;
};

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

  const [selectedMove, setSelectedMove] = useState<IMove>();

  const [selectedPiece, setSelectedPiece] = useState<string>();

  const moveableSpaces = useMemo(
    () =>
      getMoveableSpaces(
        selectedPiece,
        gameState.currentPlayer,
        selectedMove?.selectedMoveOptions
      ),
    [selectedPiece, gameState.currentPlayer, selectedMove?.selectedMoveOptions]
  );

  const handleCardClick = (options: IMove["selectedMoveOptions"]) => {
    setSelectedMove({ ...selectedMove, selectedMoveOptions: options });
  };

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

    setSelectedMove({});
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
      <CurrentPlayerCards handleCardClick={handleCardClick} />
    </div>
  );
};

export default OfflineMode;
