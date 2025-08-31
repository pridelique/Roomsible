import React from "react";
import '@app/globals.css';

function DocsBookingCondition() {
  return (
    <div className="max-w-xl">
      <div className="flex items-center mb-4 gap-3">
        <span className="border-[2.5px] border-red-400 h-12 rounded-full"></span>
        <h1 className="text-3xl font-semibold text-gray-800">เงื่อนไขการจองห้อง</h1>
      </div>
      <div className="overflow-x-auto custom-scroll ml-10 max-[460px]:ml-4 mt-4 rounded-xl shadow-sm">
        <table className="min-w-fullbg-white text-gray-700 text-base border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="py-3 px-6 font-semibold text-center bg-gray-200 rounded-tl-xl whitespace-nowrap">
                รูปแบบการจอง
              </th>
              <th className="py-3 px-6 font-semibold text-center bg-gray-200 whitespace-nowrap">
                ผู้ที่สามารถจองได้
              </th>
              <th className="py-3 px-6 font-semibold text-center bg-gray-200 whitespace-nowrap">
                จำนวนสิทธิ์
              </th>
              <th className="py-3 px-6 font-semibold text-center bg-gray-200 whitespace-nowrap">
                ระยะเวลาในการจอง
              </th>
              <th className="py-3 px-6 font-semibold text-center bg-gray-200 rounded-tr-xl whitespace-nowrap">
                การเช็คอิน
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50 transition">
              <td className="py-3 px-6 text-center border-b border-gray-200">การเรียนการสอน</td>
              <td className="py-3 px-6 text-center border-b border-gray-200">ครู และหัวหน้าห้อง</td>
              <td className="py-3 px-6 text-center border-b border-gray-200">ไม่จำกัด</td>
              <td className="py-3 px-6 text-center border-b border-gray-200">ไม่กำหนด</td>
              <td className="py-3 px-6 text-center border-b border-gray-200 whitespace-nowrap">ไม่ต้องเช็คอิน</td>
            </tr>
            <tr className="hover:bg-gray-50 transition">
              <td className="py-3 px-6 text-center border-b border-gray-200">กิจกรรม</td>
              <td className="py-3 px-6 text-center border-b border-gray-200">นักเรียนทุกคน</td>
              <td className="py-3 px-6 text-center border-b border-gray-200">1 ห้อง / สัปดาห์</td>
              <td className="py-3 px-6 text-center border-b border-gray-200">จองล่วงหน้าได้ไม่เกิน 1 วัน</td>
              <td className="py-3 px-6 text-center border-b border-gray-200 whitespace-nowrap">ต้องเช็คอิน</td>
            </tr>
          </tbody>
        </table>
      </div>
            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded flex items-start gap-2">
  <span className="text-2xl mt-1">ℹ️</span>
  <div>
    <div className="font-semibold mb-1">เงื่อนไขเพิ่มเติม</div>
    <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
      <li>ไม่สามารถจองย้อนหลัง (ในอดีต) ได้</li>
      <li>ระบบจะเริ่มนับวันใหม่เวลา 06:00 น. ของทุกวัน</li>
    </ul>
  </div>
</div>
    </div>
  );
}

export default DocsBookingCondition;