"use client";
import buildings from "@data/buildings";
import Room from "./Room";
import React, { useContext, useEffect, useState } from "react";
import { DateTimeContext } from "@provider/DateTimeProvider";
import { SessionContext } from "@provider/SessionProvider";
import { schedule } from "@data";
import { bookableRoom } from "@data";
import { getCurrentDay, getCurrentPeriod } from "@utils/currentDayPeriod";


const mapDay = {
  "วันจันทร์": 0,
  "วันอังคาร": 1,
  "วันพุธ": 2,
  "วันพฤหัสบดี": 3,
  "วันศุกร์": 4,
};

function Building({ id, handleOnClick, showName = true, bookings }) {
  const [currentDay, setCurrentDay] = useState(mapDay[0])
  const [currentPeriod, setCurrentPeriod] = useState(0)
  const { day, period } = useContext(DateTimeContext);
  const { user } = useContext(SessionContext);

  // setCurrentDay(getCurrentDay('th'))
  // setCurrentPeriod(getCurrentPeriod)

  // console.log(user)

  // console.log(`${currentDay} ${currentPeriod}`)

  // console.log(`period ${period} \ncurrent period ${currentPeriod}`)
  function checkStatus(roomName) {

    if (schedule[roomName]) {
      if (schedule[roomName][mapDay[day]][period - 1] === "In-Use") {
        return "booked"
      }
    }
    const booking = bookings.find(b => b.room === roomName);
    // console.log(booking)

    if (!booking) return "available"

    if (user.id === booking.user_id) {
      return "mybooking"
    }
    // Pending room
    if (booking.status === "pending") {
      if (currentDay === day && currentPeriod === period) {
        return "pending"
      } else return "booked"
    }

    // Confirmed Room
    else if (booking.status === "confirmed") {
      return "booked"
    }

  }

  // if the room isn't booked

  // console.log(`${day} ${period} \n ${currentDay} ${currentPeriod}`)
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

            // if ()
            // เชค status ของห้อง
            // Booking status: Available, Pending, Booked, MyBooking.
            // Can only book if available
            // Pending if not in current time means booked
            // Pending if in current time means Pending for Confirmation
            // Confirmed status after verifying
            // mapDay for accessing day etc. mapDay[0] for Monday
            // for period i-th access at (i-1)th index etc. array[0] = Period 1

            // console.log(`${room.name} ${bookableRoom.includes(room.name) ? checkStatus(room.name) : "unavailable"}`)
            const isBookable = bookableRoom.includes(room.name) && bookings;
            const status = isBookable ? checkStatus(room.name) : "unavailable";
            // console.log(room.name, "status:", status);
            return <Room
              key={`${rowIndex}-${colIndex}`}
              {...room}
              status={status}
              handleOnClick={handleOnClick}
              showName={showName}
            />

          }
            // console.log(`${room.name} ${status}`)

            // console.log(`${room.name} ${schedule[room.name] ? schedule[room.name][0] : schedule[room.name] F}`)

          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Building;
