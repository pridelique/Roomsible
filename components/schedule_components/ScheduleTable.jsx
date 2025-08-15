'use client'
import { isBookable } from "@utils/isBookable";
import { isInTomorrow } from "@utils/isInTomorrow";
import { isPast } from "@utils/isPast";
import { dayEnToThai } from "@utils/translateDay";
import { useEffect, useRef, useState } from "react";

function ScheduleTable({ status, loading, handleOnClick, user, days, filteredTimeSlots }) {

  const [tooltip, setTooltip] = useState(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setTooltip(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])

  return (
    <div className="overflow-x-auto custom-scroll pb-1.5">
      <div className="absolute w-fit bg-white text-gray-700 space-y-1 z-2">
        <div className="pr-2 flex justify-center items-center h-15"></div>
        {days.map((day) => (
          <div key={day} className="pr-4 h-13 flex justify-end items-center bg-white z-2">
            {dayEnToThai[day].replace("วัน", "")}
          </div>
        ))}
      </div>
      <div className="w-fit ml-22 space-y-1">
        <div className="flex gap-1">
          {filteredTimeSlots.map((period) => (
            <div key={period.label} className="p-2 text-center w-25 h-15">
              <div className="text-gray-700">คาบที่ {period.label}</div>
              <div className="text-xs text-gray-500 mt-0.5 whitespace-nowrap">
                {period.from} - {period.to}
              </div>
            </div>
          ))}
        </div>
        {days.map((day) => (
          <div className="flex gap-1" key={day}>
            {filteredTimeSlots.map((period) => {
              const key = `${day}-${period.label}`;
              const cellStatus = status[key];
              let tooltipContent = "ไม่สามารถจองห้องได้";
              if (isPast(day, period.label)) {
                tooltipContent = "ไม่สามารถจองห้องในอดีต";
              } else if (!isInTomorrow(day)) {
                tooltipContent = "ไม่สามารถจองห้องล่วงหน้าเกิน 2 วัน";
              }
              let bgColor = "bg-white";
              if (isBookable(day, period.label, user?.app_metadata?.role)) {
                if (cellStatus === "available") {
                  bgColor =
                    "bg-green-300 hover:bg-green-400 active:bg-green-500 cursor-pointer hover:scale-105 active:scale-95 transition duration-150";
                } else if (cellStatus === "pending-now") {
                  bgColor = "bg-yellow-300"; // เหลือง
                } else if (cellStatus === "booked") {
                  bgColor = "bg-red-300"; // แดง
                }
              } else {
                if (cellStatus === "available") {
                  bgColor = "bg-green-300/50";
                } else if (cellStatus === "pending-now") {
                  bgColor = "bg-yellow-300/50"; // เหลือง
                } else if (cellStatus === "booked") {
                  bgColor = "bg-red-300/50"; // แดง
                }
              }

              if (loading)
                return (
                  <div
                    key={key}
                    className={`bg-gray-200 animate-pulse w-25 h-13 rounded-lg`}
                  ></div>
                );
              console.log(day, String(period.label), user?.app_metadata?.role);

              return (
                <div
                  key={key}
                  className="relative w-25 h-13"
                  tabIndex={1}
                  onClick={
                    !isBookable(day, period.label, user?.app_metadata?.role)
                      ? () => {
                          setTooltip(key);
                          console.log("Tooltip set for:", key);
                        }
                      : undefined
                  }
                >
                  <button
                    // disabled={
                    //   !isBookable(
                    //     day,
                    //     period.label,
                    //     user?.app_metadata?.role
                    //   )
                    // }
                    className={`rounded-lg w-25 h-13
                        ${bgColor} cursor-pointer`}
                    onClick={
                      cellStatus == "available" &&
                      isBookable(day, period.label, user?.app_metadata?.role)
                        ? () => handleOnClick(day, period)
                        : undefined
                    }
                  />
                  {tooltip === key && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-white border border-gray-200 rounded-lg shadow px-4 py-2 text-sm text-gray-600 z-10 whitespace-nowrap" ref={tooltipRef}>
                      {tooltipContent}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScheduleTable;
