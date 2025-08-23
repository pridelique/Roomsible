"use client";
import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import "@app/globals.css";
import { schedule, timeSlots } from "@data";
import { SessionContext } from "@provider/SessionProvider";
import { notifyWaring } from "@utils/notify";
import { supabase } from "@/utils/supabase";
import { getCurrentDay, getCurrentPeriod } from "@utils/currentDayPeriod";
import { CalendarPlus } from "@node_modules/lucide-react";
import ScheduleTable from "@components/schedule_components/ScheduleTable";

const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
const mapDay = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
};

const filteredTimeSlots = timeSlots.filter(
  (slot) => slot.label >= 1 && slot.label <= 10
);

function Schedule() {
  const router = useRouter();
  const param = useParams();
  const searchParams = useSearchParams();
  const buildingId = param.id;
  const room = searchParams.get("room");

  const { user } = useContext(SessionContext);

  const innerRef = useRef(null);
  const [maxWidth, setMaxWidth] = useState(0);
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(true);

  const handleOnClick = (day, period) => {
    if (!user) {
      notifyWaring("กรุณาเข้าสู่ระบบก่อนทำการจองห้องเรียน");
      return;
    }
    router.push(
      `/form?building=${buildingId}&room=${room}&day=${day}&period=${period.label}`
    );
  };

  useEffect(() => {
    const handleResize = () => {
      const inner = innerRef.current;
      if (!inner) return;
      const innerWidth = inner.offsetWidth;
      setMaxWidth(innerWidth);
    };
    handleResize();
  }, []);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!room) return;
      setLoading(true);
      const currentDay = getCurrentDay("eng");
      const currentPeriod = getCurrentPeriod();

      const { data, error } = await supabase
        .from("bookings")
        .select("day, period, status")
        .eq("room", room);

      if (error) {
        console.error("Error fetching booking:", error.message);
        return;
      }

      const bookedMap = {};
      data.forEach((item) => {
        bookedMap[`${item.day}-${item.period}`] = item.status;
      });

      const newStatus = {};
      days.forEach((day) => {
        filteredTimeSlots.forEach((period) => {
          const key = `${day}-${period.label}`;
          const bookingStatus = bookedMap[key];

          if (!bookingStatus) {
            if (
              schedule[room][mapDay[day]][Number(period.label)] === "In-Use"
            ) {
              newStatus[`${day}-${period.label}`] = "booked";
            } else {
              newStatus[`${day}-${period.label}`] = "available";
            }
          } else if (
            bookingStatus === "pending" &&
            day === currentDay &&
            period.label === currentPeriod
          ) {
            newStatus[`${day}-${period.label}`] = "pending";
          } else {
            newStatus[`${day}-${period.label}`] = "booked";
          }
        });
      });
      setLoading(false);
      setStatus(newStatus);
    };

    fetchStatus();
  }, [room]);

  const legendItems = [
    { text: "ว่าง", color: "bg-green-500", iconColor: "text-green-500" },
    { text: "รออนุมัติ", color: "bg-yellow-500", iconColor: "text-yellow-500" },
    { text: "ไม่ว่าง", color: "bg-red-500", iconColor: "text-red-500" },
  ];

  console.log(status);

  return (
    <section className="min-[460px]:px-4 min-[460px]:py-4 max-container w-full flex-1 flex">
      <div className="bg-white min-[460px]:rounded-3xl min-[460px]:shadow-lg px-6 py-4 w-full min-[460px]:h-full mx-auto max-w-[1200px] max-[460px]:flex-1">

        <header className="relative p-6 rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br z-3 from-red-500 via-rose-500 to-pink-500 mb-3">
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-white opacity-10 rounded-full transform rotate-45"></div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white opacity-10 rounded-full transform -rotate-45"></div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <div className="p-4 rounded-full bg-white/20 bg-opacity-20 backdrop-filter backdrop-blur-sm mb-2">
              <CalendarPlus className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-[33px] font-semibold text-white leading-10">
              {room
                ? String(room).startsWith("ห้อง")
                  ? room
                  : `ห้อง ${room}`
                : "ชื่อห้อง"}
            </h1>
            <p className="text-lg text-white">ตารางการใช้ห้องเรียน</p>
          </div>
        </header>

        <div className="w-full bg-white flex items-center min-[400px]:justify-center justify-evenly min-[400px]:gap-x-6 mb-1">
        
        {/* Legend Section */}
        {legendItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 p-3 text-gray-700`}
          >
            <div className={`w-4 h-4 rounded-full ${item.color} shadow-sm`}></div>
            <span className="text-sm font-medium whitespace-nowrap">{item.text}</span>
          </div>
        ))}
        
      </div>

        {/* table */}
        <ScheduleTable
          status={status}
          loading={loading}
          handleOnClick={handleOnClick}
          user={user}
          days={days}
          filteredTimeSlots={filteredTimeSlots}
        />
      </div>
    </section>
  );
}

export default Schedule;
