import React from "react";

function DocsPenalty() {
  return (
    <div className="max-w-xl">
      <div className="flex items-center mb-4 gap-3">
        <span className="border-[2.5px] border-red-400 h-12 rounded-full"></span>
        <h1 className="text-3xl font-bold text-gray-800">บทลงโทษ</h1>
      </div>
      <p className="text-gray-600 ml-10 max-[460px]:ml-4 mb-4">
        <span className="font-semibold">หากไม่เช็คอินตามเวลาที่กำหนด</span>{" "}
        ห้องจะถูกปล่อยว่าง และระบบจะบันทึกว่า{" "}
        <span className="font-semibold text-red-500">ไม่เช็คอิน</span>{" "}
        ซึ่งมีผลต่อบทลงโทษดังนี้
      </p>
      <div className="overflow-x-auto ml-10 max-[460px]:ml-4">
        <table className="min-w-full bg-white rounded-xl shadow-sm text-gray-700 text-base mb-6 border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="py-3 px-6 font-semibold text-center bg-gray-200 rounded-tl-xl whitespace-nowrap">
                จำนวนครั้ง
                <br />
                ที่ไม่เช็คอิน
              </th>
              <th className="py-3 px-6 font-semibold text-center bg-gray-200 rounded-tr-xl">
                บทลงโทษ
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50 transition">
              <td className="py-3 px-6 text-center whitespace-nowrap border-b border-gray-200">
                1 - 2 ครั้ง
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                หมดสิทธิ์การจองในสัปดาห์นั้น
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition">
              <td className="py-3 px-6 text-center whitespace-nowrap border-b border-gray-200">
                3 - 4 ครั้ง
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                หมดสิทธิ์การจองในสัปดาห์นั้น + ระงับสิทธิ์ 1 สัปดาห์
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition">
              <td className="py-3 px-6 text-center whitespace-nowrap border-b border-gray-200">
                5 - 6 ครั้ง
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                หมดสิทธิ์การจองในสัปดาห์นั้น + ระงับสิทธิ์ 2 สัปดาห์
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition">
              <td className="py-3 px-6 text-center whitespace-nowrap">7 ครั้งขึ้นไป</td>
              <td className="py-3 px-6">
                หมดสิทธิ์การจองในสัปดาห์นั้น + ระงับสิทธิ์ 4 สัปดาห์
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400 rounded flex items-start gap-2">
        <div className="text-2xl">✅</div>
        <div>
          <span className="font-semibold">หากถูกระงับสิทธิ์</span>{" "}
          จะสามารถกลับมาจองได้อีกครั้งในวันจันทร์ของสัปดาห์ที่สิทธิ์กลับมา
        </div>
      </div>
    </div>
  );
}

export default DocsPenalty;
