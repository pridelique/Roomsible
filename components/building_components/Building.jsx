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
      console.log(`Bookings fetched in ${endTime - startTime} ms`);
      console.log(data);
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!id || !day || !period) return;
    getBookings();
    console.log(`Fetched bookings for building: ${id}`);
  }, [day, period, id]);

  // handle refresh

  useEffect(() => {
    if (!id || !day || !period) return;
    clearTimeout(refreshTimeout.current);
    if (refresh) {
      getBookings();
      console.log(`Fetched bookings for building: ${id}`);
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
        gridTemplateColumns: `repeat(${buildings[id]?.col}, 80px)`,
        gridTemplateRows: `repeat(${buildings[id]?.row}, 100px)`,
      }}
    >
      {buildings[id]?.rooms.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map(
            (room, colIndex) => {
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
              const status = isBookable
                ? checkStatus(room.name)
                : "unavailable";
              // console.log(room.name, "status:", status);
              return (
                <Room
                  key={`${rowIndex}-${colIndex}`}
                  {...room}
                  status={room.name === "ไม่มีห้อง" ? "none" : status}
                  handleOnClick={handleOnClick}
                  // handleScheduleClick={handleScheduleClick}
                  showName={showName}
                  loading={loading}
                />
              );
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
