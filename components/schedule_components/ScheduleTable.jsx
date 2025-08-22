'use client'
import { getTooltipContent } from "@data/getTooltipContent";
import { isBookable } from "@utils/isBookable";
import { dayEnToThai } from "@utils/translateDay";
import { useEffect, useRef, useState } from "react";

function ScheduleTable({ status, loading, handleOnClick, user, days, filteredTimeSlots }) {
  const [selected, setSelected] = useState(null);
  const tooltipRef = useRef({});
  const selectedRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {      
      if (selectedRef.current && tooltipRef.current && !tooltipRef.current[selectedRef.current]?.contains(event.target) && selectedRef.current !== event.target.id) {
        setSelected(null);
        selectedRef.current = null;
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="overflow-x-auto overflow-y-hidden custom-scroll pb-1.5" onScroll={() => setSelected(null)}>
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
              const tooltipContent = getTooltipContent(day, period.label, cellStatus, user);
              let bgColor = "bg-white";
              if (isBookable(day, period.label, user?.app_metadata?.role)) {
                if (cellStatus === "available") {
                  bgColor =
                    "bg-green-300 hover:bg-green-400 active:bg-green-500 cursor-pointer hover:scale-105 active:scale-95 transition duration-150";
                } else if (cellStatus === "pending") {
                  bgColor = "bg-yellow-300"; // เหลือง
                } else if (cellStatus === "booked") {
                  bgColor = "bg-red-300"; // แดง
                }
              } else {
                if (cellStatus === "available") {
                  bgColor = "bg-green-300/50";
                } else if (cellStatus === "pending") {
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

              return (
                <div
                  key={key}
                  className="relative w-25 h-13"
                  tabIndex={1}
                  onClick={
                    !isBookable(day, period.label, user?.app_metadata?.role) || cellStatus !== 'available'
                      ? () => {
                        setSelected(key);
                        selectedRef.current = key;
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
                    id={key}
                    className={`rounded-lg w-25 h-13 ${bgColor} cursor-pointer`}
                    onClick={
                      cellStatus == "available" &&
                      isBookable(day, period.label, user?.app_metadata?.role)
                        ? () => handleOnClick(day, period)
                        : undefined
                    }
                  />
                    <div id={key} className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-white border border-gray-200 rounded-lg shadow px-4 py-2 text-sm text-gray-600 whitespace-nowrap transition-all duration-300 origin-bottom z-3 ${selected === key ? 'opacity-100 scale-100' : 'opacity-0 scale-0'} `} ref={el => tooltipRef.current[key] = el}>
                      {tooltipContent}
                    </div>
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
