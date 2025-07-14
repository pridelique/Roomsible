"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import "@app/globals.css";
import { statusColors, timeSlots } from "@data";
import StatusLabel from "@components/building_components/StatusLabel";
import { SessionContext } from "@provider/SessionProvider";
import { notifySuccess, notifyWaring } from "@utils/notify";
import { dayEnToThai, dayThaiToEn } from "@utils/translateDay";
import { isPast } from "@utils/isPast";
import { isInTorrorrow } from "@utils/isInTomorrow";
import { isBookable } from "@utils/isBookable";
function Schedule() {
  const router = useRouter();
  const param = useParams();
  const searchParams = useSearchParams();
  const buildingId = param.id;
  const room = searchParams.get("room");
  const innerRef = useRef(null);
  const [maxWidth, setMaxWidth] = useState(0);
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useContext(SessionContext);  

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  const handleOnClick = (day, period) => {
    if (!user) {
      notifyWaring("กรุณาเข้าสู่ระบบก่อนทำการจองห้องเรียน");
    } else {
      router.push(`/building/${buildingId}/schedule/form?room=${room}&day=${day}&period=${period.label}`)
    }
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
    days.forEach((day) => {
      timeSlots.forEach((period) => {
        setStatus((prev) => ({
          ...prev,
          [`${day}-${period.label}`]: Math.ceil(Math.random() * 2) % 2,
        }));
      });
    });
    setLoading(false);
    
  }, []);
  
  return (
    <section className="padding-x max-container w-full pt-6">
      <div className="text-center mb-4">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-600">
          ตารางการใช้งานห้อง {room}
        </h2>
        <p className="text-slate-gray max-w-md mx-auto mt-2 text-sm md:text-base">
          เลือกห้องที่ว่างเพื่อจองห้องเรียนในช่วงเวลาที่ต้องการ
        </p>
      </div>
      <div
        className="bg-white overflow-x-auto border border-gray-300 shadow-md rounded-md custom-scroll mx-auto"
        style={{ maxWidth: maxWidth + 2 }}
      >
        <div
          className="w-fit border border-gray-300 overflow-hidden"
          style={{
            display: "grid",
            gridTemplateColumns: `100px repeat(${timeSlots.length-1},120px)`,
            gridTemplateRows: `60px repeat(${days.length},60px)`,
          }}
          ref={innerRef}
        >
          {/* หัวตาราง */}
          <div className="border border-gray-300 text-gray-700 flex items-center justify-center font-semibold bg-white">
            วัน/เวลา
          </div>
          {timeSlots.map((period, index) => {
            if (period.label === "Homeroom") return null; // Skip Homeroom
            return (
              <div
                key={`header-${index}`}
                className="border border-gray-300 flex flex-col items-center justify-center bg-white text-sm px-1 text-center"
              >
                <div className="text-gray-700">คาบที่ {period.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {period.from} - {period.to}
                </div>
              </div>
            );
          })}

          {/* แถวแต่ละวัน */}
          {days.map((day) => (
            <React.Fragment key={day}>
              <div className="border border-gray-300 flex items-center justify-center bg-white text-gray-700">
                {dayEnToThai[day]}
              </div>
              {timeSlots.map((period) => {
                if (period.label === "Homeroom") return;
                return (
                  <button
                    key={`${day}-${period.label}`}
                    disabled={!isBookable(day, period.label, user?.app_metadata?.role)}
                    className={`border border-gray-200 disabled:cursor-not-allowed ${
                      status[`${day}-${period.label}`]
                        ? "bg-[#86EFAC] not-disabled:hover:bg-[#4ADE80] cursor-pointer disabled:bg-[#74d296]"
                        : "bg-[#FCA5A5] disabled:bg-[#d08484]"
                    }`}
                    onClick={
                      status[`${day}-${period.label}`]
                        ? () => handleOnClick(day, period)
                        : undefined
                    }
                  />
                  
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex max-w-xl w-fit gap-6 mx-auto mt-6">
        <StatusLabel statusThai={"ว่าง"} color={statusColors.available} />
        <StatusLabel statusThai={"ไม่ว่าง"} color={statusColors.booked} />
      </div>
    </section>
  );
}

export default Schedule;
