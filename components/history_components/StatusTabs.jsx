import React, { useEffect, useRef, useState } from "react";

function StatusTabs({ statusFilter, setStatusFilter, thStatus, statusList, bookings, dateFilterFuction, dateFilter }) {
  const tabsRefs = useRef([])
  const statusFilterRef = useRef(null);
  const [underlineStyle, setUnderlineStyle] = useState({});

  const resizeUnderline = () => {
    const idx = statusList.indexOf(statusFilterRef.current);
    if (tabsRefs.current[idx]) {
      const el = tabsRefs.current[idx];
      setUnderlineStyle({
        left: (el.offsetLeft-4) + 'px',
        width: (el.offsetWidth+8) + 'px',
        opacity: 100,
      });
      
    }
  }

  useEffect(() => {
    setTimeout(() => {
      statusFilterRef.current = statusFilter;
      resizeUnderline();
    }, 0);
  }, [statusFilter, dateFilter, bookings])

  useEffect(() => {
    resizeUnderline();
    statusFilterRef.current = statusFilter;
    window.addEventListener("resize", resizeUnderline);
    return () => {
      window.removeEventListener("resize", resizeUnderline);
    };
  },[])

  return (
    <div className="relative">
      <ul className="flex items-center justify-start gap-4 sm:gap-6 ml-8 text-sm sm:text-base max-sm:justify-evenly max-sm:ml-0">
        {statusList.map((status) => (
          <li
            key={status}
            ref={(el) => (tabsRefs.current[statusList.indexOf(status)] = el)}
            className={`flex justify-center items-center gap-1 cursor-pointer  ${
              status === statusFilter
                ? "text-red-400 font-[450]"
                : "text-gray-600/90"
            }`}
            onClick={() => setStatusFilter(status)}
          >
            {thStatus[status]}
            <span
              className={`${
                status === statusFilter
                  ? "text-red-400/80"
                  : "text-slate-gray/80"
              }`}
            >
              {
                bookings
                .filter(
                  (booking) => dateFilterFuction(booking)
                ).filter(
                  (booking) => status === "all" || booking.status === status
                ).length
              }
            </span>
          </li>
        ))}
      </ul>
      <span
        className='absolute border-[1.5px] -translate-y-1/2 mt-2 border-red-400 rounded-full transition-all duration-300 ease-in-out opacity-0'
        style={underlineStyle}
      ></span>
      <hr className="mt-2 border-gray-300" />
    </div>
  );
}

export default StatusTabs;
