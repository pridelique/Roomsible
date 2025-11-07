"use client";
import buildings from "@data/buildings";
import Room from "./Room";
import React, { useContext, useEffect, useRef, useState } from "react";
import { DateTimeContext } from "@provider/DateTimeProvider";
import { SessionContext } from "@provider/SessionProvider";
import { schedule } from "@data";
import { bookableRoom } from "@data";
import { supabase } from "@utils/supabase";

const mapDay = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
};

function Building({
  id,
  handleOnClick,
  handleScheduleClick,
  showName = true,
  refresh,
  setRefresh,
}) {
  // const [currentDay, setCurrentDay] = useState(mapDay[0]);
  // const [currentPeriod, setCurrentPeriod] = useState(0);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [roomStatus, setRoomStatus] = useState({});
  const refreshTimeout = useRef(null);
  const { day, period, currentDay, currentPeriod } =
    useContext(DateTimeContext);
  const { user } = useContext(SessionContext);

  // console.log(currentDay, day, currentPeriod, period);

  // setCurrentDay(getCurrentDay('th'))
  // setCurrentPeriod(getCurrentPeriod)

  // console.log(user)

  // console.log(`${currentDay} ${currentPeriod}`)

  // console.log(`period ${period} \ncurrent period ${currentPeriod}`)

  // get building data
  const getBookings = async () => {
    setLoading(true);
    try {
      const startTime = performance.now();
      const { data, error } = await supabase
        .from("bookings")
        .select("room, status, user_id")
        .eq("building", id)
        .eq("day", day)
        .eq("period", period);
      if (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
        return;
      }
      const endTime = performance.now();
      // console.log(`Bookings fetched in ${endTime - startTime} ms`);
      // console.log(data);
      setBookings(data.filter((booking) => booking.status !== "cancelled"));
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  useEffect(() => {
    const status = {};
    buildings[id]?.rooms.forEach((row) => {
      row.forEach((room) => {
        const isBookable = bookableRoom.includes(room.name) && bookings;
        status[room.name] = isBookable ? checkStatus(room.name) : "unavailable";
      });
    });
    setRoomStatus(status);
  }, [bookings]);

  useEffect(() => {
    if (!id || !day || !period) return;
    getBookings();
    // console.log(`Fetched bookings for building: ${id}`);
  }, [day, period, id]);

  // handle refresh

  useEffect(() => {
    if (!id || !day || !period) return;
    clearTimeout(refreshTimeout.current);
    if (refresh) {
      getBookings();
      // console.log(`Fetched bookings for building: ${id}`);
    }
    if (setRefresh) {
      refreshTimeout.current = setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }
  }, [refresh]);

  function checkStatus(roomName) {
    if (!day || !period) return "unavailable";
    if (schedule[roomName]) {
      if (schedule[roomName][mapDay[day]][period] === "In-Use") {
        return "booked";
      }
    }
    const booking = bookings.find((b) => b.room === roomName);
    // console.log(booking)

    if (!booking) return "available";

    if (booking.status === "cancelled") {
      return "available";
    }

    if (user?.id === booking.user_id) {
      return "mybooking";
    }

    // Pending room
    if (booking.status === "pending") {
      if (currentDay === day && currentPeriod === period) {
        return "pending";
      } else return "booked";
    }

    // Test Pending Room
    // if (booking.status === "pending") {
    //   if (testDay === dayThaiToEn[day] && testPeriod === period) {
    //     return "pending";
    //   } else return "booked";
    // }

    // Confirmed Room
    else if (booking.status === "confirmed") {
      return "booked";
    }
  }

  // if the room isn't booked

  // console.log(`${day} ${period} \n ${currentDay} ${currentPeriod}`)
  // console.log(user);

  return (
    <div
      className="gap-1.5 grid"
      style={{
        gridTemplateColumns: `${showName ? `repeat(${buildings[id]?.col}, 80px) 45px` : `repeat(${buildings[id]?.col}, 80px) `} `, // label อยู่ขวาสุด
        gridTemplateRows: `repeat(${buildings[id]?.row}, 100px)`,
      }}
    >
      {buildings[id]?.rooms.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {/* ห้องแต่ละห้องใน row นี้ */}
          {row.map((room, colIndex) => (
            <Room
              key={`${rowIndex}-${colIndex}`}
              {...room}
              status={
                room.name === "ไม่มีห้อง" ? "none" : roomStatus[room.name]
              }
              handleOnClick={handleOnClick}
              showName={showName}
              loading={loading}
            />
          ))}
          {/* Label ชั้น (อยู่ขวาสุดของแต่ละแถว) */}
          {showName && (
            <div
              className="flex items-center justify-center rounded-xl font-semibold text-gray-500 text-base  ml-2 relative"
              style={{
                gridColumn: `${buildings[id]?.col + 1} / ${
                  buildings[id]?.col + 2
                }`,
                gridRow: `${rowIndex + 1} / ${rowIndex + 2}`,
              }}
            >
              <span className=" whitespace-nowrap">
                ชั้น {buildings[id]?.row - rowIndex}
              </span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Building;
