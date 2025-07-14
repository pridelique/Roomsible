import { useEffect, useRef, useState } from "react";
import ConfirmCancelBox from "./ConfirmCancelBox";
import { getCurrentDay, getCurrentPeriod } from "@utils/currentDayPeriod";
import { isPast } from "@utils/isPast";

function OptionButton({ booking, cancelBooking }) {
  const optionRef = useRef(null);
  const detailRef = useRef(null);
  const [isOpenOption, setIsOpenOption] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [isOpenWaring, setIsOpenWarning] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionRef.current && !optionRef.current.contains(event.target)) {
        setIsOpenOption(false);
      }
      if (detailRef.current && !detailRef.current.contains(event.target)) {
        setIsOpenDetail(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const isCancelable = () => {
    if (booking.type === 'class' && isPast(booking.day, booking.period)) {
      return false;
    } else if (booking.status === 'pending') {
      if (booking.day == getCurrentDay('eng') && booking.period == getCurrentPeriod()) {        
        return false
      }
    }
    return true;
    
  };
  // isCancelable()

  return (
    <div className="relative">
      <button
        className="text-xl size-4 p-3 flex justify-center items-center text-gray-600 cursor-pointer hover:bg-gray-50 active:bg-gray-100 rounded-full"
        onClick={() => setTimeout(() => setIsOpenOption(!isOpenOption), 0)}
      >
        <p>⋮</p>
      </button>
      {isOpenOption && (
        <ul
          className={`absolute right-full w-36 bg-white border border-gray-300 rounded shadow-md text-sm z-3 ${isCancelable() ? '-top-[45px]' : '-top-[6px]'}`}
          ref={optionRef}
        >
          <li
            onClick={() => setTimeout(() => setIsOpenDetail(!isOpenDetail), 0)}
            className="px-4 py-2 hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
          >
            รายละเอียด
          </li>
          {isCancelable() && (
            <li
              onClick={() => {
                setIsOpenWarning(true);
                setIsOpenOption(false);
                setIsOpenDetail(false);
              }}
              className="px-4 py-2 hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
            >
              ยกเลิกการจอง
            </li>
          )}
        </ul>
      )}
      {isOpenDetail && (
        <div
          className="z-4 absolute right-full -top-[50px] w-56 bg-white border rounded shadow-md text-sm p-4 border-gray-300"
          ref={detailRef}
        >
          {/* <div className="font-medium mb-2">รายละเอียดการจอง</div> */}
          <div>{booking.type === 'class' ? `${booking.teacher} วิชา${booking.subject} ${booking.student_class}`: `${booking.detail}`}</div>
          <div className="flex justify-end">
            <button
              onClick={() => setTimeout(() => setIsOpenDetail(false), 0)}
              className="text-right text-blue-500 text-xs mt-3 cursor-pointer hover:text-blue-600 active:text-blue-700"
            >
              ปิด
            </button>
          </div>
        </div>
      )}
      {isOpenWaring && (
        <ConfirmCancelBox
          booking={booking}
          setIsOpenWarning={setIsOpenWarning}
          cancelBooking={cancelBooking}
        />
      )}
    </div>
  );
}

export default OptionButton;
