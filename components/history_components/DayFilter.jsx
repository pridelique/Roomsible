import { Arrow_down } from "@public/assets/icons";
import { useEffect, useRef, useState } from "react";

const DayFilterList = [
  { value: "all", label: "ทั้งหมด" },
  { value: "today", label: "วันนี้" },
  { value: "fromToday", label: "ตั้งแต่วันนี้" },
  { value: "options", label: "เลือก" },
];

function DayFilter({
  dayFilter,
  setdayFilter,
  selectedDate,
  setSelectedDate,
  bookings,
  dayList,
}) {
  const [boxStyle, setBoxStyle] = useState({});
  const [isShowOptions, setIsShowOptions] = useState(false);
  const previousdayFilterRef = useRef(null);
  const dropdownRef = useRef(null);
  const optionRefs = useRef([]);
  const dayFilterRef = useRef(null);

  const resizeBox = () => {
    const idx = DayFilterList.findIndex(
      (opt) => opt.value === dayFilterRef.current
    );
    if (idx === -1) return;
    if (optionRefs.current[idx]) {
      const el = optionRefs.current[idx];
      setBoxStyle({
        width: el.offsetWidth,
        left: el.offsetLeft,
        height: el.offsetHeight,
      });
    }
  };

  const handleCloseDropdown = () => {
      console.log(selectedDate, previousdayFilterRef.current, dayFilter);
      
      if (previousdayFilterRef.current !== "options") {        
        setdayFilter(previousdayFilterRef.current);
      }
      setIsShowOptions(false);    
  };

  useEffect(() => {
    setTimeout(() => {
      dayFilterRef.current = dayFilter;
      resizeBox();
    }, 0);
  }, [dayFilter, bookings, selectedDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleCloseDropdown();
      }      
    };

    dayFilterRef.current = "today";
    previousdayFilterRef.current = dayFilter;
    resizeBox();
    window.addEventListener("resize", resizeBox);
    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("resize", resizeBox);
      document.removeEventListener("click", handleClickOutside);
    }
  }, []);
  return (
    <div className="flex justify-center items-center bg-gray-200 rounded-lg p-1 shadow-md relative cursor-pointer max-sm:text-sm">
      {DayFilterList.map((option) => {
        if (option.value === "options")
          return (
            <div
              key={option.value}
              ref={(el) =>
                (optionRefs.current[DayFilterList.indexOf(option)] = el)
              }
              className={`transition-all duration-300 relative min-w-[100px] max-sm:min-w-[85px] ${
                dayFilter === option.value ? "text-gray-600" : "text-gray-500"
              }`}
            >
              <button
                className="relative z-3 flex gap-2 justify-center items-center cursor-pointer px-4 pr-2 py-1 mx-auto w-full"
                onClick={() =>
                  setTimeout(() => {
                    if (!isShowOptions) {
                      setIsShowOptions(true);
                      previousdayFilterRef.current = dayFilter;
                      setdayFilter(option.value);
                    }
                  }, 0)
                }
              >
                <p className="relative z-2 cursor-pointer whitespace-nowrap">
                  {selectedDate || option.label}
                </p>
                <Arrow_down
                  className={`w-4 h-4 text-gray-500 relative z-2 ${
                    dayFilter === option.value
                      ? "text-gray-600"
                      : "text-gray-500"
                  }`}
                />
              </button>
              {isShowOptions && (
                <ul
                  className="z-3 border border-gray-300 absolute top-9 right-0 bg-white rounded-lg shadow-md w-full overflow-hidden"
                  ref={dropdownRef}
                >
                  {day.map((day) => (
                    <li
                      key={day}
                      className="hover:bg-gray-100 active:bg-gray-100 cursor-pointer"
                    >
                      <button
                        className="cursor-pointer w-full px-3 py-1 text-center"
                        onClick={() =>
                          setTimeout(() => {
                            setSelectedDate(day);
                            setIsShowOptions(false);
                            resizeBox();
                          }, 0)
                        }
                      >
                        {day}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        return (
          <button
            key={option.value}
            ref={(el) =>
              (optionRefs.current[DayFilterList.indexOf(option)] = el)
            }
            className={`px-4 py-1 transition-all duration-300 ${
              dayFilter === option.value ? "text-gray-600" : "text-gray-500"
            }`}
            onClick={() => setTimeout(() => setdayFilter(option.value), 0)}
          >
            <p className="relative z-2 cursor-pointer whitespace-nowrap">
              {option.label}
            </p>
          </button>
        );
      })}
      <div
        className="absolute z-1 bg-white rounded-lg shadow-md transition-all duration-300"
        style={boxStyle}
      ></div>
    </div>
  );
}

export default DayFilter;
