"use client";
import React, { useEffect, useRef, useState } from "react";
import "@app/globals.css";
import { useParams, useRouter, useSearchParams } from "next/navigation";

function Schedule() {
  const router = useRouter();
  const param = useParams();
  const searchParams = useSearchParams();
  const buildingId = param.id;
  const roomNumber = searchParams.get("roomNumber");
  const innerRef = useRef(null);
  const [maxWidth, setMaxWidth] = useState(0);
  const [status, setStatus] = useState({});
  const days = ["วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์"];
  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const startMinutes = 8 * 60 + 30 + i * 50;
    const endMinutes = startMinutes + 50;

    const formatTime = (mins) => {
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      return `${h}:${m.toString().padStart(2, "0")}`;
    };

    return {
      label: i + 1,
      time: `(${formatTime(startMinutes)}–${formatTime(endMinutes)})`,
    };
  });

  const handleOnClick = (day, period) => {
    router.push(
      `/building/${buildingId}/schedule/form?roomNumber=${roomNumber}&day=${day}&period=${period.label}`
    );
  };

  useEffect(() => {
    const handleResize = () => {
      const inner = innerRef.current;
      if (!inner) return;
      const innerWidth = inner.offsetWidth;
      setMaxWidth(innerWidth);
    };
    handleResize(); // Initial call to set the width
  }, []);

  useEffect(() => {
    days.map((day) => {
      timeSlots.map((period) => {
        setStatus((prev) => {
          return {
            ...prev,
            [`${day}-${period.label}`]: Math.ceil(Math.random() * 2) % 2,
          };
        });
        console.log(`${day}-${period.label}`);
      });
    });
  }, []);

  return (
    <section className="padding-x max-container w-full pt-6">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-10 mt-5">
        ตารางเวลา ตึกเอกอำนวยการ : ห้อง {roomNumber}
      </h2>
      <div
        className="overflow-x-auto border border-gray-300 shadow-md rounded-md custom-scroll mx-auto"
        style={{ maxWidth: maxWidth + 2 }}
      >
        <div
          className="w-fit border border-gray-300"
          style={{
            display: "grid",
            gridTemplateColumns: `100px repeat(${timeSlots.length},120px)`,
            gridTemplateRows: `60px repeat(${days.length},60px)`,
          }}
          ref={innerRef}
        >
          <div className="border border-gray-300 text-gray-700 flex items-center justify-center font-semibold bg-white">
            วัน/เวลา
          </div>
          {timeSlots.map((period, index) => (
            <div
              key={index}
              className="border border-gray-300 flex flex-col items-center justify-center bg-white text-sm px-1 text-center"
            >
              <div className="text-gray-700">คาบที่ {period.label}</div>
              <div className="text-xs text-gray-500">{period.time}</div>
            </div>
          ))}

          {days.map((day) => (
            <React.Fragment key={day}>
              <div className="border border-gray-300 flex items-center justify-center bg-white text-gray-700">
                {day}
              </div>
              {timeSlots.map((period, index) => (
                <div
                  key={`${day}-${index}`}
                  className={`border border-gray-200  ${
                    status[`${day}-${period.label}`]
                      ? "bg-green-200 cursor-pointer hover:bg-green-300"
                      : "bg-red-200"
                  }`}
                  onClick={
                    status[`${day}-${period.label}`]
                      ? () => handleOnClick(day, period)
                      : undefined
                  }
                ></div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Schedule;
