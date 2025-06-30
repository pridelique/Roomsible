import { Arrow_down } from "@public/assets/icons";
import { useEffect, useRef, useState } from "react";

const dateFilterList = [
  { value: "all", label: "ทั้งหมด" },
  { value: "today", label: "วันนี้" },
  { value: "fromToday", label: "ตั้งแต่วันนี้" },
  { value: "options", label: "เลือก" },
];

function DateFilter({
  dateFilter,
  setDateFilter,
  selectedDate,
  setSelectedDate,
  bookings,
  dateList,
}) {
  const [boxStyle, setBoxStyle] = useState({});
  const [isShowOptions, setIsShowOptions] = useState(false);
  const previousDateFilterRef = useRef(null);
  const dropdownRef = useRef(null);
  const optionRefs = useRef([]);
  const dateFilterRef = useRef(null);

  const resizeBox = () => {
    const idx = dateFilterList.findIndex(
      (opt) => opt.value === dateFilterRef.current
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
      console.log(selectedDate, previousDateFilterRef.current, dateFilter);
      
      if (previousDateFilterRef.current !== "options") {        
        setDateFilter(previousDateFilterRef.current);
      }
      setIsShowOptions(false);    
  };

  useEffect(() => {
    setTimeout(() => {
      dateFilterRef.current = dateFilter;
      resizeBox();
    }, 0);
  }, [dateFilter, bookings, selectedDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleCloseDropdown();
      }      
    };

    dateFilterRef.current = "today";
    previousDateFilterRef.current = dateFilter;
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
      {dateFilterList.map((option) => {
        if (option.value === "options")
          return (
            <div
              key={option.value}
              ref={(el) =>
                (optionRefs.current[dateFilterList.indexOf(option)] = el)
              }
              className={`transition-all duration-300 relative min-w-[100px] max-sm:min-w-[85px] ${
                dateFilter === option.value ? "text-gray-600" : "text-gray-500"
              }`}
            >
              <button
                className="relative z-3 flex gap-2 justify-center items-center cursor-pointer px-4 pr-2 py-1 mx-auto w-full"
                onClick={() =>
                  setTimeout(() => {
                    if (!isShowOptions) {
                      setIsShowOptions(true);
                      previousDateFilterRef.current = dateFilter;
                      setDateFilter(option.value);
                    }
                  }, 0)
                }
              >
                <p className="relative z-2 cursor-pointer whitespace-nowrap">
                  {selectedDate || option.label}
                </p>
                <Arrow_down
                  className={`w-4 h-4 text-gray-500 relative z-2 ${
                    dateFilter === option.value
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
                  {dateList.map((date) => (
                    <li
                      key={date}
                      className="hover:bg-gray-100 active:bg-gray-100 cursor-pointer"
                    >
                      <button
                        className="cursor-pointer w-full px-3 py-1 text-center"
                        onClick={() =>
                          setTimeout(() => {
                            setSelectedDate(date);
                            setIsShowOptions(false);
                            resizeBox();
                          }, 0)
                        }
                      >
                        {date}
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
              (optionRefs.current[dateFilterList.indexOf(option)] = el)
            }
            className={`px-4 py-1 transition-all duration-300 ${
              dateFilter === option.value ? "text-gray-600" : "text-gray-500"
            }`}
            onClick={() => setTimeout(() => setDateFilter(option.value), 0)}
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

export default DateFilter;
