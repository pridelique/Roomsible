'use client'

import { useRef, useState } from "react";
import { InfoIcon } from "@public/assets/icons";

function HistoryTooltip() {
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef(null);

  return (
    <div
      className="absolute top-3 left-3 w-fit h-fit flex justify-center items-start z-3 max-[460px]:scale-80 origin-top-left"
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
        className={`absolute left-0 top-12 bg-white border border-gray-200 rounded-lg shadow px-4 py-3 text-sm text-gray-600 z-50 whitespace-nowrap transition-all duration-300 origin-top-left ${
          showTooltip
            ? "scale-100 opacity-100"
            : "scale-90 opacity-0 pointer-events-none"
        }`}
      >
        <p className="font-semibold mb-2">วิธีใช้งาน</p>
        <ul className="list-disc list-inside space-y-1">
          <li>คลิกที่ห้องเพื่อดูรายละเอียด</li>
          <li>สีของห้องแสดงสถานะการใช้งาน</li>
          <li>สามารถเลื่อนและซูมแผนผังได้</li>
        </ul>
      </div>
    </div>
  );
}

export default HistoryTooltip;
