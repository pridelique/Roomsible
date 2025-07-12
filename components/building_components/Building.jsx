"use client";
import buildings from "@data/buildings";
import Room from "./Room";
import React, { useContext, useEffect } from "react";
import { DateTimeContext } from "@provider/DateTimeProvider";
import { SessionContext } from "@provider/SessionProvider";
import { schedule } from "@data";

function Building({ id, handleOnClick, showName = true, bookings }) {
  const { day, period, currentDay, currentPeriod } = useContext(DateTimeContext);
  const { user } = useContext(SessionContext);
  // console.log(user);
  
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
          {row.map((room, colIndex) => {
            // เชค status ของห้อง

            return (
              <Room
                key={`${rowIndex}-${colIndex}`}
                {...room}
                handleOnClick={handleOnClick}
                showName={showName}
              />
            )
          })}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Building;
