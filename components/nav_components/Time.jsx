"use client";

import Image from "@node_modules/next/image";
import { arrow_down, clock } from "@public/assets/icons";
import { useEffect, useRef, useState } from "react";

const periods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function Time({ period, setPeriod, timeDropdown, setTimeDropdown }) {
  const timeDropdownRef = useRef(null)
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (timeDropdownRef.current && !timeDropdownRef.current.contains(event.target)) setTimeDropdown(false)        
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })

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
    <li className="text-slate-gray relative">
      <div
        className="cursor-pointer hover:bg-gray-100 flex justify-between items-center gap-2 pl-3 pr-2 py-2 rounded-lg max-[460px]:gap-3"
        onClick={() => setTimeout(() => setTimeDropdown(!timeDropdown), 0)}
      >
        <div className="flex gap-2 justify-center items-center max-[460px]:gap-3">
          <Image
            src={clock}
            alt="clock"
            width={20}
            height={20}
            className="mt-[1px]"
          />
          <p>{screenWidth > 460 ? `คาบ ${period}` : period}</p>
        </div>
        <div className="flex justify-center items-center transition-transform duration-150" style={{transform : `rotate(${ timeDropdown ? 180 : 0}deg)`}}>
          <Image src={arrow_down} alt="arrow_down" width={16} height={16} />
        </div>
      </div>
      {timeDropdown && (
        <div className="absolute top-full right-0 border border-gray-300 w-full bg-white z-9 rounded-lg shadow-lg overflow-hidden"  ref={timeDropdownRef}>
          <ul>
            {periods.map((period) => (
              <li
                key={period}
                className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-center"
                onClick={() => setTimeout(() => {
                  setPeriod(period);
                  setTimeDropdown(false);
                }, 0)}
              >
                <p>คาบ {period}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default Time;
