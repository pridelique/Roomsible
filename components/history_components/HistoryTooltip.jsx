'use client'

import { useEffect, useRef, useState } from "react";
import { InfoIcon } from "@public/assets/icons";

function HistoryTooltip() {
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
                setShowTooltip(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

  return (
    <div
      className="absolute top-4 right-4 w-fit h-fit flex justify-center items-start z-3 max-[460px]:scale-80 origin-top-right"
      onClick={(e) => {
        setShowTooltip(!showTooltip);
      }}
      ref={tooltipRef}
    >
      <span
        tabIndex={1}
        className="text-gray-500 hover:text-gray-600 hover:bg-gray-100 hover:scale-110 active:text-gray-700 active:bg-gray-200 active:scale-90 cursor-pointer bg-white transition duration-150 shadow-md rounded-full p-1.5"
      >
        <InfoIcon className="w-7 h-7" />
      </span>
      <div
        className={`absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow px-4 py-3 text-sm text-gray-600 z-50 whitespace-nowrap transition-all duration-300 origin-top-right ${
          showTooltip
            ? "scale-100 opacity-100"
            : "scale-90 opacity-0 pointer-events-none"
        }`}
      >
        <p className="font-semibold mb-2">วิธีใช้งาน</p>
        <ul className="list-disc list-inside space-y-1">
          <li>เลื่อนซ้ายขวาเพื่อดูข้อมูลการจองทั้งหมด</li>
          <li>คลิกที่ ⋮ เพื่อดูรายละเอียดหรือยกเลิกการจอง</li>
        </ul>
      </div>
    </div>
  );
}

export default HistoryTooltip;
