'use client';
import buildings from "@data/buildings";
import Room from "./Room";
import React from "react";

function Building({ id, handleOnClick, showName = true }) {
  return (
    <div
      className="gap-1.5 grid"
      style={{
        gridTemplateColumns: `repeat(${buildings[id]?.col}, 80px)`,
        gridTemplateRows: `repeat(${buildings[id]?.row}, 100px)`,
      }}
    >
      {buildings[id]?.rooms.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((room, colIndex) => (
            <Room
              key={`${rowIndex}-${colIndex}`}
              {...room}
              handleOnClick={handleOnClick}
              showName={showName}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Building;
