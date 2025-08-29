"use client";

import { buildings, timeSlots } from "@data";
import { addDays } from "@node_modules/date-fns/addDays";
import { getDate } from "@node_modules/date-fns/getDate";
import { getDay } from "@node_modules/date-fns/getDay";
import { getMonth } from "@node_modules/date-fns/getMonth";
import { getYear } from "@node_modules/date-fns/getYear";
import {
  Calendar,
  CheckCircle,
  CheckCircle2,
  Clock,
  Home,
  Layers,
  MapPin,
} from "@node_modules/lucide-react";
import Image from "@node_modules/next/image";
import Link from "@node_modules/next/link";
import { buildingImages } from "@public/assets/images";
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

function SuccessCard({ room, day, period, buildingId, type, mode }) {
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
      <div
        className={`sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full h-fit min-[380px]:px-4 min-[380px]:max-[460px]:pt-4 flex justify-center min-[380px]:mb-4 transition-all duration-200 ${
          showSuccess ? "opacity-100 scale-100" : "opacity-0 scale-90"
        } transition-opacity duration-500`}
      >
        <div className="bg-white min-[380px]:rounded-3xl min-[380px]:shadow-xl w-fit max-w-sm sm:max-w-2xl h-fit flex flex-col sm:flex-row overflow-hidden">
          {/* Image Container */}
          <div className="flex-[1_1_200px] min-h-[300px] relative">
            <Image
              src={buildingImages[Number(buildingId)]}
              alt="Building"
              width={448}
              height={300}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center inset-0 bg-black/65 backdrop-blur-[1px] w-full h-full flex flex-col justify-center items-center p-6">
              <CheckCircle className="w-25 h-25 mx-auto text-[#39e75f] drop-shadow-lg " />
              <h1 className="text-4xl font-semibold text-[#39e75f] text-center mt-2 drop-shadow-lg">
                {type === "booking" ? "จองสำเร็จ!" : "เช็คอินสำเร็จ!"}
              </h1>
              <p className="text-gray-200 text-center text-sm mt-1 drop-shadow-lg">
                {type === "booking"
                  ? "การจองของคุณได้รับการยืนยันเรียบร้อยแล้ว"
                  : "การเช็คอินของคุณได้รับการยืนยันเรียบร้อยแล้ว"}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="flex-[1_1_300px] p-4 sm:p-6 flex flex-col justify-center h-fit w-full">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4 text-left mt-2 shadow-inner">
              <div className="flex items-center space-x-4">
                <Layers size={20} className="text-blue-500 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    ห้องเรียน
                  </span>
                  <p className="font-semibold text-lg text-gray-900">
                    {String(room).startsWith("ห้อง") ? room : `ห้อง ${room}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Calendar size={20} className="text-red-500 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    วันที่
                  </span>
                  <p className="font-semibold text-lg text-gray-900">
                    {dayEnToThai[day]}, {getDate(selectedDate)}{" "}
                    {thaiMonth[getMonth(selectedDate)]}{" "}
                    {getYear(selectedDate) + 543}{" "}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Clock size={20} className="text-orange-500 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    เวลา
                  </span>
                  <p className="font-semibold text-lg text-gray-900">
                    คาบที่ {period} ({timeSlots[Number(period)]?.from} -{" "}
                    {timeSlots[Number(period)]?.to} น.)
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <MapPin size={20} className="text-purple-500 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    สถานที่
                  </span>
                  <p className="font-semibold text-lg text-gray-900">
                    อาคาร {buildingId} -{" "}
                    {buildings[buildingId]?.name || "ไม่ระบุ"}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-slate-gray text-center text-sm mt-4 whitespace-pre-line">
              {type === "booking"
                ? mode === 'activity' ? `แสกน QR Code ที่${room.startsWith("ห้อง") ? room : `ห้อง ${room}`} เพื่อเช็คอิน ก่อนเวลา ${expiredAt?.getUTCHours().toString().padStart(2, "0")}.${expiredAt?.getUTCMinutes().toString().padStart(2, "0")} น. ${dayEnToThai[day]} ที่ ${getDate(expiredAt)} ${thaiMonth[getMonth(expiredAt)]} ${getYear(expiredAt) + 543}`
                : 'ไม่จำเป็นต้องเช็คอินสำหรับการจองนี้'
                : "ขอบคุณที่ใช้บริการ ขอให้มีวันที่ดีนะคะ 😊"}
            </p>
            <Link
              href="/"
              className="py-2 rounded-xl shadow-sm mx-0 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:scale-105 active:scale-95 transition-all duration-150 focus:outline-none shadow-green-500/50 text-white text-center flex items-center justify-center gap-2 mt-3"
            >
              <Home className="w-5 h-5" />
              <span className="font-semibold text-lg">กลับหน้าหลัก</span>
            </Link>
          </div>
        </div>
      </div>
  );
}

export default SuccessCard;
