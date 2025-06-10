'use client'
import React from "react";
import { useRouter } from 'next/navigation';
function BookingStatus() {
    const success=1
    const room=1303
    const seat=9
    const router=useRouter()
    const imageIndex=7
    const imageSrc = `/assets/images/header${imageIndex}.jpg`;

  return (
    <div className="items-center justify-center text-center">
      <div className="bg-white rounded-3xl shadow-md w-full max-w-md mx-auto border border-gray-300 mt-25 mb-7">
        <img
            src={imageSrc} className="mb-7 rounded-t-3xl"/>
            <div className="p-4">
          <div
            className={`text-2xl font-semibold mb-4 ${
              success ? "text-green-600" : "text-red-600"
            }`}
          >
            {success ? "การจองสำเร็จ" : "การจองไม่สำเร็จ"}
          </div>
          <p className="text-gray-600 mt-2">
            {success
              ? `จองห้อง ${room} คาบที่ ${seat} เรียบร้อยแล้ว`
              : "ขณะนี้ห้องที่ท่านต้องการจองยังไม่ว่าง"}
          </p>
          <button
            onClick={() => router.push('/')}
            className={`mb-15 mt-10 w-[90%] py-2 rounded-full shadow-md mx-auto block border border-gray-300 bg-white text-gray-600${
              success ? "hover:bg-none hover:bg-gradient-to-r from-green-300 to-green-600 hover:text-white" : "hover:bg-none hover:bg-gradient-to-r from-red-300 to-red-600 hover:text-white"
            }`}
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingStatus;
