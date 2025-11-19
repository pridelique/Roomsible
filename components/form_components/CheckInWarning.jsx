import { addDays } from "@node_modules/date-fns/addDays";
import { getDate } from "@node_modules/date-fns/getDate";
import { getDay } from "@node_modules/date-fns/getDay";
import { getMonth } from "@node_modules/date-fns/getMonth";
import { getYear } from "@node_modules/date-fns/getYear";
import Link from "@node_modules/next/link";
import { Warning } from "@public/assets/icons";
import getExpiredDate from "@utils/getExpiredDate";
import { dayEnToThai } from "@utils/translateDay";
import React, { useEffect, useState } from "react";

const mapDay = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
};

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

function CheckInWarning({ room, day, period, handleOnClick }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showSuccess, setShowSuccess] = useState(false);
  const [expiredAt, setExpiredAt] = useState(null);

  useEffect(() => {
    if (room) {
      setTimeout(() => {
        setShowSuccess(true);
      }, 10);
    }
  }, [room]);

  new Date().getUTCMinutes;

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

  useEffect(() => {
    if (!day || !period) return;
    const expiredDate = getExpiredDate(day, period);
    setExpiredAt(expiredDate);
  }, [day, period]);
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-8">
      <div className="absolute top-1/2 left-1/2 -translate-1/2 px-3 w-full">
        <div className="bg-white text-white px-8 py-6 rounded-xl z-3 shadow-lg text-center w-full  max-w-[380px] flex flex-col justify-center items-center mx-auto">
          <div>
            <Warning className="size-20 text-yellow-400" />
          </div>
          <h3 className="text-2xl text-gray-700 mt-4 font-semibold">
            การเช็คอิน
          </h3>
          <div className="leading-6 mt-2 text-slate-gray px-3 whitespace-pre-line">
            <span>กรุณาเช็คอินเข้าใช้งานห้องก่อนเวลา</span>
            <span className="font-semibold text-black/70">{`\n${expiredAt
              ?.getUTCHours()
              .toString()
              .padStart(2, "0")}.${expiredAt
              ?.getUTCMinutes()
              .toString()
              .padStart(2, "0")} น. ${dayEnToThai[day]} ที่ ${getDate(
              expiredAt
            )} ${thaiMonth[getMonth(expiredAt)]} ${
              getYear(expiredAt) + 543
            }\n`}</span>
            <span className="whitespace-pre-line">
              โดยไปเมนู{" "}
              <span className="font-semibold text text-black/70">เช็คอิน</span>{" "}
              และแสกน{" "}
              <span className="font-semibold text text-black/70">QR Code</span>{'\n'}
              ที่ <span className="font-semibold text text-black/70">{`${room.startsWith("ห้อง") ? room : `ห้อง ${room}`}\n`}</span>
            </span>
            <p className="mt-2">
              หากไม่เช็คอินภายในเวลาที่กำหนด ห้องจะถูกปล่อยว่างทันที
              และมีบทลงโทษเล็กน้อย
            </p>
          </div>
          <div className="flex justify-around font-semibold underline text-gray-600 w-full mt-2">
            <Link className="hover:text-gray-700" href={"/docs#checkin"}>วิธีการเช็คอิน</Link>
            <Link className="hover:text-gray-700" href={"/docs#penalty"}>บทลงโทษ</Link>
          </div>

          {/* <hr className="w-full border border-gray-300 my-5" /> */}
          <button
            className={`text-white bg-gradient-to-r hover:scale-105 active:scale-95 focus:outline-none transition-all duration-150 font-medium text-center shadow-sm cursor-pointer py-2 w-full rounded-2xl mt-4 bg-yellow-400 hover:bg-yellow-500`}
            onClick={handleOnClick}
          >
            ตกลง
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckInWarning;
