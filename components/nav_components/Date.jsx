"use client";

import Image from "@node_modules/next/image";
import { arrow_down, date } from "@public/assets/icons";
import { useEffect, useRef, useState } from "react";

const days = ["วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์"];
const dayShort = {
  วันจันทร์: "จ.",
  วันอังคาร: "อ.",
  วันพุธ: "พ.",
  วันพฤหัสบดี: "พฤ.",
  วันศุกร์: "ศ.",
};

function Date({ day, setDay, dateDropdown, setDateDropdown }) {
  const dropdownRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDateDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    setTimeout(() => handleResize(), 10);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        className="cursor-pointer hover:bg-gray-100 flex justify-between items-center gap-2 pl-3 pr-2 py-2 rounded-lg  max-[460px]:gap-3"
        onClick={() => setTimeout(() => setDateDropdown(!dateDropdown), 0)}
      >
        <div className="flex gap-2 justify-center items-center max-[460px]:gap-4">
          <Image
            src={date}
            alt="date"
            width={20}
            height={20}
            className="mt-[1px]"
          />
          <p>{screenWidth > 460 ? day : dayShort[day]}</p>
        </div>
        <div
          className="flex justify-center items-center transition-transform duration-150"
          style={{ transform: `rotate(${dateDropdown ? 180 : 0}deg)` }}
        >
          <Image src={arrow_down} alt="arrow_down" width={16} height={16} />
        </div>
      </div>
      {dateDropdown && (
        <div
          className="absolute top-full right-0 border border-gray-300 w-full bg-white z-9 rounded-lg shadow-lg overflow-hidden min-w-[130px]"
          ref={dropdownRef}
        >
          <ul>
            {days.map((day) => (
              <li
                key={day}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-center"
                onClick={() =>
                  setTimeout(() => {
                    setDay(day);
                    setDateDropdown(false);
                  }, 0)
                }
              >
                <p>{screenWidth > 460 ? day : dayShort[day]}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Date;
