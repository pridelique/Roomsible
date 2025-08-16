"use client";
import { buildings, timeSlots } from "@data";
import { getTooltipContent } from "@data/getTooltipContent";
import { addDays } from "@node_modules/date-fns/addDays";
import { getDate } from "@node_modules/date-fns/getDate";
import { getDay } from "@node_modules/date-fns/getDay";
import { getMonth } from "@node_modules/date-fns/getMonth";
import { getYear } from "@node_modules/date-fns/getYear";
import {
  BookOpen,
  CalendarDays,
  Clock,
  MapPin,
  Users,
} from "@node_modules/lucide-react";
import { SessionContext } from "@provider/SessionProvider";
import { InfoIcon, Schedule } from "@public/assets/icons";
import { isBookable } from "@utils/isBookable";
import { dayEnToThai } from "@utils/translateDay";
import React, { useContext, useEffect, useRef, useState } from "react";

const thaiMonth = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

const mapDay = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
};

const statusColors = {
  available: {
    bg: "bg-green-100",
    text: "text-green-800",
    dot: "bg-green-400",
    label: "ว่าง",
  },
  booked: {
    bg: "bg-red-100",
    text: "text-red-800",
    dot: "bg-red-400",
    label: "จองแล้ว",
  },
  pending: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    dot: "bg-yellow-400",
    label: "รอยืนยัน",
  },
  mybooking: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    dot: "bg-blue-400",
    label: "คุณจอง",
  },
};

function BookingCard({
  room,
  day,
  period,
  buildingId,
  status,
  setBookingCard,
  handleFormClick,
  handleScheduleClick,
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookable, setBookable] = useState(false);
  const cardRef = useRef(null);

  const { user } = useContext(SessionContext);

  const statusStyle = statusColors[status];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setBookingCard(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (
      status === "available" &&
      user &&
      isBookable(day, period, user?.app_metadata?.role)
    ) {
      setBookable(true);
    } else {
      setBookable(false);
    }

    setTooltipContent(getTooltipContent(day, period, status, user));
  }, [room, day, period, status]);

  useEffect(
    (date = new Date()) => {
      if (!day || !period) return;
      const dayCount = getDay(date);
      if (dayCount === 0) {
        setSelectedDate(addDays(addDays(date, 1), mapDay[day]));
      } else if (dayCount === 6) {
        setSelectedDate(addDays(addDays(date, 2), mapDay[day]));
      } else {
        setSelectedDate(addDays(addDays(date, -dayCount + 1), mapDay[day]));
      }
    },
    [day]
  );

  return (
    <div className="absolute inset-0 z-4 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-all duration-200" />
      <div className="relative z-5">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl shadow-2xl bg-white backdrop-blur-xl px-10 py-8 max-w-md mx-auto flex flex-col min-w-[420px] border border-gray-100 transition-transform duration-200 hover:shadow-2xl focus:outline-none"
          tabIndex={0}
          ref={cardRef}
        >
          <div className="absolute top-8 right-6">
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full inset-shadow-xs ${statusStyle.bg} transition-colors duration-200`}
            >
              <span
                className={`w-2 h-2 rounded-full ${statusStyle.dot} shadow`}
              />
              <span className={`text-sm font-semibold ${statusStyle.text}`}>
                {statusStyle.label}
              </span>
            </div>
          </div>
          <div className="text-4xl font-semibold text-gray-800 tracking-wide drop-shadow-sm text-start">
            {room
              ? String(room).startsWith("ห้อง")
                ? room
                : `ห้อง ${room}`
              : "ชื่อห้อง"}
          </div>

          <span className="border border-gray-300 w-full mx-auto my-5"></span>

          {/* Content Section with details */}
          <div className="flex flex-col space-y-5 bg-gray-00 w-full">
            {/* Day and Date */}
            <div className="flex items-center space-x-4 text-gray-700">
              <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-lg shadow-inner">
                <CalendarDays className="h-6 w-6 text-red-500" />
              </div>
              <div className="flex flex-col">
                {/* <span className="text-md text-gray-500">
                  วันและวันที่
                </span> */}
                <span className="text-lg font-semibold">
                  {dayEnToThai[day]}
                </span>

                <span className="text-md text-gray-600">
                  {getDate(selectedDate)} {thaiMonth[getMonth(selectedDate)]}{" "}
                  {getYear(selectedDate) + 543}{" "}
                </span>
              </div>
            </div>

            {/* Period and Time */}
            <div className="flex items-center space-x-4 text-gray-700">
              <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-lg shadow-inner">
                <Clock className="h-6 w-6 text-red-500" />
              </div>
              <div className="flex flex-col">
                {/* <span className="text-md text-gray-500">
                  คาบและเวลา
                </span> */}
                <span className="text-lg font-semibold">คาบที่ {period}</span>
                <span className="text-md text-gray-600">
                  {timeSlots[period].from} - {timeSlots[period].to} น.
                </span>
              </div>
            </div>

            {/* Room Details */}
            <div className="flex items-center space-x-4 text-gray-700">
              <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-lg shadow-inner">
                <MapPin className="h-6 w-6 text-red-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold">
                  อาคาร {buildingId}
                </span>
                <span className="text-md text-gray-600">
                  {buildings[buildingId]?.name || "ไม่ระบุ"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <div className="relative flex-1">
              <button
                className={`w-full font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150 flex items-center justify-center gap-2 text-lg ${
                  bookable
                    ? "bg-gradient-to-bl hover:bg-gradient-to-tr from-green-500 via-green-400 to-emerald-400 text-white hover:scale-105 active:scale-95 cursor-pointer"
                    : "bg-gray-300/80 text-gray-500/80"
                }`}
                onClick={() => handleFormClick(room)}
                disabled={!bookable}
              >
                {bookable ? (
                  <>
                    <BookOpen className="w-6 h-6" />
                    จองห้องนี้
                  </>
                ) : (
                  "ไม่สามารถจองได้"
                )}
                {!bookable && (
                  <span
                    className="absolute right-4 flex items-center"
                    // onMouseEnter={() => setShowTooltip(true)}
                    // onMouseLeave={() => setShowTooltip(false)}
                    tabIndex={0}
                    onFocus={() => setShowTooltip(true)}
                    onBlur={() => setShowTooltip(false)}
                  >
                    <span className="ml-1 text-gray-400 hover:text-gray-500 focus:text-gray-600 focus:outline-none cursor-pointer">
                      <InfoIcon className="w-6 h-6 " />
                    </span>
                    <div
                      className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white border border-gray-200 rounded-lg shadow px-4 py-2 text-sm text-gray-600 z-50 whitespace-nowrap transition-all duration-300 origin-bottom 
                      ${
                        showTooltip
                          ? "scale-100 opacity-100"
                          : "scale-90 opacity-0 pointer-events-none"
                      }`}
                    >
                      {tooltipContent || "ไม่สามารถจองได้"}
                    </div>
                  </span>
                )}
              </button>
            </div>
            <button
              type="button"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-white/70 hover:bg-gray-100 active:bg-gray-200 shadow-md duration-150 scale-105 hover:scale-110 active:scale-95 cursor-pointer"
              title="ดูตารางห้อง"
              onClick={() => handleScheduleClick(room)}
            >
              <span className="w-fit h-fit flex items-center justify-center">
                <Schedule className="w-6 h-6 text-gray-600" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingCard;
