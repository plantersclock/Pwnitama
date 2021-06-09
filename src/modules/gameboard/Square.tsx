import { FC } from "react";

interface IPiece {
  type: string;
  player: number;
}

interface IProps {
  space: string;
  squareState: IPiece;
  selectedPiece?: string;
  moveableSpaces: any;
  setSelectedPiece: (value: string) => void | undefined;
  handleMove: (value: string) => void | undefined;
  currentPlayer: number;
}

const Square: FC<IProps> = ({
  space,
  squareState,
  setSelectedPiece,
  selectedPiece,
  moveableSpaces,
  handleMove,
  currentPlayer,
}) => {
  console.log(squareState);

  const handleClick = () => {
    if (squareState && squareState.player === currentPlayer)
      return () => setSelectedPiece(space);
    if (moveableSpaces?.includes(space)) return () => handleMove(space);
  };
  return (
    <>
      <div
        className={
          (selectedPiece === space && "bg-red-100") +
          " cursor-pointer border border-black relative col-span-1 w-full " +
          (moveableSpaces?.includes(space) && "bg-green-100")
        }
        style={{ paddingTop: "100%" }}
        onClick={handleClick()}
      >
        {squareState?.player === 1 ? (
          <div className="absolute top-0 leading-none w-full h-full flex justify-center items-center text-green-800">
            {squareState?.type ? squareState.type : space}
          </div>
        ) : squareState?.player === 2 ? (
          <div
            className="absolute top-0 leading-none w-full h-full flex justify-center items-center text-blue-800"
            style={{ transform: "rotate(180deg)" }}
          >
            {squareState?.type ? squareState.type : space}
          </div>
        ) : (
          <div className="absolute top-0 leading-none w-full h-full flex justify-center items-center">
            {squareState?.type ? squareState.type : space}
          </div>
        )}
      </div>
    </>
  );
};

export default Square;
