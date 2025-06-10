'use client'
import React from "react";
import { useRouter } from 'next/navigation';
function BookingStatus() {
    const success=1
    const room=1303
    const seat=9
    const router=useRouter();
  return (
    <div className="items-center justify-center text-center">
      <div className="bg-white rounded-3xl shadow-md w-full max-w-md mx-auto border border-gray-300 mt-25">
        <div className="rounded-t-3xl p-6 pb-0 bg-gradient-to-t from-green-100 to-blue-100">
          <div className="flex justify-center">
            <img
              src={success ? "/success-icon.png" : "/error-icon.png"}
              alt="status icon"
              className="h-20"
            />
          </div>
        </div>
        <div className="p-4">
          <h1
            className={`text-2xl font-bold ${
              success ? "text-green-600" : "text-red-600"
            }`}
          >
            {success ? "การจองสำเร็จ" : "การจองไม่สำเร็จ"}
          </h1>
          <p className="text-gray-600 mt-2">
            {success
              ? `จองห้อง ${room} คาบที่ ${seat} เรียบร้อยแล้ว`
              : "ขณะนี้ห้องที่ท่านต้องการจองยังไม่ว่าง"}
          </p>
          <button
            className="mt-6 px-6 py-2 bg-gradient-to-r from-yellow-100 to-pink-100 rounded-xl shadow text-black font-semibold"
            onClick={() => router.push('/')}
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingStatus;
