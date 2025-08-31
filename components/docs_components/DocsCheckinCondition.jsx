import React from "react";
import DocsLink from "./DocsLink";

function DocsCheckinCondition() {
  return (
    <div className="max-w-xl">
      <div className="flex items-center mb-4 gap-3">
        <span className="border-[2.5px] border-red-400 h-12 rounded-full"></span>
        <h1 className="text-3xl font-semibold text-gray-800">
          เงื่อนไขการเช็คอิน
        </h1>
      </div>
      <div className="ml-10 max-[460px]:ml-4">
        <ul className="list-decimal list-inside mt-2 space-y-1 text-gray-700">
          <li>
            <span className="font-semibold">การเรียนการสอน</span> →{" "}
            <span className="text-gray-700">ไม่ต้องเช็คอิน</span>
          </li>
          <li>
            <span className="font-semibold">กิจกรรม</span> →{" "}
            <span className="text-gray-700">ต้องเช็คอิน</span>
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-gray-700">
              <li>
                <span className="font-semibold">การจองก่อนถึงคาบเรียน</span> →
                ต้องเช็คอินภายใน <span className="font-semibold">10 นาที</span>{" "}
                หลังเริ่มคาบ
                <br />
                <span className="text-gray-500 ml-6">
                  ตัวอย่าง: ถ้าคาบเริ่มเวลา 09:20 → ต้องเช็คอินไม่เกิน 09:30
                </span>
              </li>
              <li>
                <span className="font-semibold">การจองหลังคาบเริ่มไปแล้ว</span>{" "}
                → ต้องเช็คอินภายใน{" "}
                <span className="font-semibold">10 นาที</span> หลังจากจองสำเร็จ
                <br />
                <span className="text-gray-500 ml-6">
                  ตัวอย่าง: หากจองสำเร็จเวลา 09:25 → ต้องเช็คอินไม่เกิน 09:35
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded flex items-start gap-2">
        <span className="text-2xl">⚠️</span>
        <div>
          <span className="font-semibold">หากไม่เช็คอินตามเวลาที่กำหนด</span>{" "}
          ห้องจะถูกปล่อยว่าง และระบบจะบันทึกว่า{" "}
          <span className="font-semibold text-red-500">ไม่เช็คอิน</span>{" "}
          ซึ่งมีผลต่อ{" "}
          <DocsLink to="penalty" content="บทลงโทษ" />
        </div>
      </div>
    </div>
  );
}

export default DocsCheckinCondition;
