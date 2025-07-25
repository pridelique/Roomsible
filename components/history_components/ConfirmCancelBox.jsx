import { Warning } from "@public/assets/icons";
import { useEffect } from "react";
import { createPortal } from "react-dom";
function ConfirmCancelBox({ booking, setIsOpenWarning, cancelBooking}) {

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  const content = (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-8" onClick={() => setIsOpenWarning(false)}>
      <div className="absolute top-1/2 left-1/2 -translate-1/2 px-3 w-full z-2">
        <div className="bg-white text-white px-8 pt-8 pb-6 rounded-xl z-3 shadow-lg text-center w-full  max-w-[340px] flex flex-col justify-center items-center mx-auto">

          <Warning className="w-16 h-16 text-red-400" />

          <h3 className="text-xl text-gray-700 mt-3 font-semibold">ยกเลิกการจอง</h3>
          <p className="leading-6 mt-2 text-slate-gray px-3 whitespace-pre-line">
            คุณต้องการยกเลิกการจองห้อง {booking.room} ใช่หรือไม่?
          </p>

          <div className="border flex w-full gap-3">
            <button
              className='text-gray-700 border border-gray-700 
              hover:bg-gray-100 active:bg-gray-100 
              focus:outline-none font-medium text-center shadow-sm cursor-pointer py-2 w-full rounded-2xl mt-6'
              onClick={() => setIsOpenWarning(false)}
            >
              ยกเลิก
            </button>
            <button
              className='text-white bg-gradient-to-r hover:bg-gradient-to-br focus:outline-none font-medium text-center shadow-sm cursor-pointer py-2 w-full rounded-2xl mt-6 from-red-400 via-red-500 to-red-600 shadow-red-500/50'
              onClick={() => {
                cancelBooking(booking.booking_id)
                setIsOpenWarning(false);
            }}
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  return createPortal(content, document.body)
}

export default ConfirmCancelBox;
