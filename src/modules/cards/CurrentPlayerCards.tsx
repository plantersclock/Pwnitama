import React, { FC } from "react";

interface IProps {
  handleCardClick: (value: any) => void | undefined;
}

const CurrentPlayerCards: FC<IProps> = ({ handleCardClick }) => {
  return (
    <div className="grid grid-cols-3 gap-1 m-1">
      <button
        type="button"
        className="bg-gray-200 rounded font-medium"
        onClick={() => handleCardClick([{ x: 0, y: 2 }])}
      >
        up2
      </button>
      <button
        type="button"
        className="bg-gray-200 rounded font-medium"
        onClick={() =>
          handleCardClick([
            { x: 1, y: 1 },
            { x: -1, y: 1 },
          ])
        }
      >
        -diag-1
      </button>
    </div>
  );
};

export default CurrentPlayerCards;
