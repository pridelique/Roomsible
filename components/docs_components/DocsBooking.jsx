import { status } from "@data";
import {
  BookOpen,
  CalendarClockIcon,
  CalendarDays,
} from "@node_modules/lucide-react";
import React from "react";
import DocsLink from "./DocsLink";
import {
  Booking10,
  Booking11,
  Booking2_3_4,
  Booking4,
  Booking5,
  Booking6,
  Booking6_2,
  Booking7_8_9,
} from "@public/assets/images";
import Image from "@node_modules/next/image";

function DocsBooking() {
  return (
    <div className="w-full">
      <div className="flex items-center mb-4 gap-3">
        <span className="border-[2.5px] border-red-400 h-12 rounded-full"></span>
        <h1 className="text-3xl font-semibold text-gray-800">การจองห้อง</h1>
      </div>
      <ol className="list-decimal list-inside space-y-3 text-gray-700 text-base ">
        {/* 1 2 3 4 */}
        <div className="flex flex-col w-full">
          <div className="ml-10 max-[460px]:ml-4 space-y-3 max-w-xl">
            <li>
              ไปที่ <span className="font-semibold">หน้าหลัก</span>
            </li>
            <li>
              กดที่
              <span className="inline-flex items-center p-1.5 bg-gray-100 rounded-full font-semibold text-gray-700 mx-2 shadow">
                <CalendarClockIcon className="w-4 h-4" />
              </span>
              เพื่อเลือกวันและคาบที่ต้องการ
            </li>
            <li>
              สามารถดู <span className="font-semibold">สถานะการใช้งาน</span>{" "}
              จากสีที่แสดงในแต่ละห้อง โดยแต่ละสีมีความหมายดังนี้
              <div className="overflow-x-auto mt-3 rounded-xl shadow-sm">
                <table className="min-w-full bg-white  text-gray-700 text-base border-separate border-spacing-0">
                  <thead>
                    <tr>
                      <th className="py-3 px-6 font-semibold text-center bg-gray-200 rounded-tl-xl whitespace-nowrap">
                        สี
                      </th>
                      <th className="py-3 px-6 font-semibold text-center bg-gray-200">
                        สถานะ
                      </th>
                      <th className="py-3 px-6 font-semibold text-center bg-gray-200 rounded-tr-xl whitespace-nowrap">
                        คำอธิบาย
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {status.map((item, index) => (
                      <tr
                        className="hover:bg-gray-100 transition"
                        key={item.statusEng}
                      >
                        <td
                          className={`py-3 px-6 text-center border-b border-gray-200 ${
                            index === status.length - 1 ? "rounded-bl-xl" : ""
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="size-4 rounded-sm shadow-lg"
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span>({item.thColor})</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center border-b border-gray-200 whitespace-nowrap">
                          {item.statusThai}
                        </td>
                        <td
                          className={`py-3 px-6 text-start border-b border-gray-200 whitespace-nowrap ${
                            index === status.length - 1 ? "rounded-br-xl" : ""
                          }`}
                        >
                          {item.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </li>
            <li>
              เลือก <span className="font-semibold">ตึก</span> ที่ต้องการ{" "}
              <span className="text-gray-500">(สามารถเลือกได้ 2 วิธี)</span>
              <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-gray-600">
                <li>กดที่ตัวตึกบนหน้าหลัก</li>
                <li>
                  หรือเลือกจากเมนู <span className="font-semibold">ตึก</span>
                </li>
              </ul>
            </li>
          </div>

          <div className="flex flex-col sm:flex-row flex-1 justify-evenly items-center mt-6 mb-2 gap-3 max-w-2xl">
            <Image
              src={Booking2_3_4}
              alt="Booking2_3_4"
              width={200}
              height={200}
              className="shadow-lg rounded-lg"
            />
            <Image
              src={Booking4}
              alt="Booking4"
              width={200}
              height={200}
              className="shadow-lg rounded-lg"
            />
          </div>
        </div>

        {/* 5 */}
        <div className="flex flex-col w-full">
          <div className="ml-10 max-[460px]:ml-4 space-y-3 max-w-xl">
            <li>
              เลือก <span className="font-semibold">ห้อง</span> ที่ต้องการจอง
            </li>
          </div>

          <div className="flex flex-col sm:flex-row flex-1 justify-evenly items-center mt-6 mb-2 gap-3 max-w-2xl">
            <Image
              src={Booking5}
              alt="Booking5"
              width={200}
              height={200}
              className="shadow-lg rounded-lg"
            />
          </div>
        </div>
        
        {/* 6 */}
        <div className="flex flex-col w-full">
          <div className="ml-10 max-[460px]:ml-4 space-y-3 max-w-xl">
            <li>
              ไปที่หน้า <span className="font-semibold">ฟอร์มการจองห้อง</span>{" "}
              <span className="text-gray-500">(สามารถทำได้ 2 วิธี)</span>
              <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-gray-600">
                <li>
                  กดที่
                  <div className="px-3.5 py-1.5 text-white bg-gradient-to-bl hover:bg-gradient-to-tr from-green-500 via-green-400 to-emerald-400 focus:outline-none transition duration-150 font-medium text-[12px] text-center rounded-lg  shadow-md cursor-pointer mx-2 inline-flex gap-1 items-center">
                    <BookOpen className="w-4 h-4" />
                    จองห้องนี้
                  </div>
                </li>
                <li>
                  หรือกดที่
                  <span className="inline-flex items-center p-1.5 bg-gray-100 rounded-full font-semibold text-gray-700 mx-2 shadow">
                    <CalendarDays className="w-4 h-4" />
                  </span>
                  เพื่อไปที่หน้า{" "}
                  <span className="font-semibold">ตารางการใช้งานห้องเรียน</span>{" "}
                  → กดที่ช่องวันเวลาที่ต้องการจองในตาราง
                </li>
              </ul>
            </li>
          </div>

          <div className="flex flex-col sm:flex-row flex-1 justify-evenly items-center mt-6 mb-2 gap-3 max-w-2xl">
            <Image
              src={Booking6}
              alt="Booking6"
              width={200}
              height={200}
              className="shadow-lg rounded-lg"
            />
            <Image
              src={Booking6_2}
              alt="Booking6_2"
              width={200}
              height={200}
              className="shadow-lg rounded-lg"
            />
          </div>
        </div>

        {/* 7 8 9 10 */}
        <div className="flex flex-col w-full">
          <div className="ml-10 max-[460px]:ml-4 space-y-3 max-w-xl">
            <li>
              เลือก <DocsLink to="booking-condition" content="รูปแบบการจอง" />{" "}
              <span className="text-gray-500">(การเรียนการสอน / กิจกรรม)</span>
            </li>
            <li>กรอกรายละเอียดการจองให้ครบถ้วน</li>
            <li>
              กดปุ่ม
              <span className="px-3.5 py-1.5 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none hover:scale-105 active:scale-95 transition duration-150 shadow-red-500/50 font-medium text-[12px] text-center rounded-lg shadow-md cursor-pointer mx-2">
                ยืนยันการจอง
              </span>
            </li>
            <li>
              หากจองสำเร็จ ระบบจะแสดงหน้าสำเร็จ พร้อมรายละเอียดการจอง
              <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-gray-600">
                <li>หากเป็นการจองกิจกรรม → ต้องเช็คอินภายในเวลาที่กำหนด</li>
              </ul>
            </li>
          </div>

          {/* 11 */}
          <div className="flex flex-col sm:flex-row flex-1 justify-evenly items-center mt-6 mb-2 gap-3 max-w-2xl">
            <Image
              src={Booking7_8_9}
              alt="Booking7_8_9"
              width={200}
              height={200}
              className="shadow-lg rounded-lg"
            />
            <Image
              src={Booking10}
              alt="Booking10"
              width={200}
              height={200}
              className="shadow-lg rounded-lg"
            />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="ml-10 max-[460px]:ml-4 space-y-3 max-w-xl">
            <li>
              สามารถตรวจสอบการจองได้ที่เมนู{" "}
              <span className="font-semibold">ประวัติ</span>
            </li>
          </div>

          <div className="flex flex-col sm:flex-row flex-1 justify-evenly items-center mt-6 mb-2 gap-3 max-w-2xl">
            <Image
              src={Booking11}
              alt="Booking11"
              width={200}
              height={200}
              className="shadow-lg rounded-lg"
            />
          </div>
        </div>
      </ol>
    </div>
  );
}

{/* <div className="flex flex-col w-full">
  <div className="ml-10 max-[460px]:ml-4 space-y-3 max-w-xl">
    
  </div>

  <div className="flex flex-col sm:flex-row flex-1 justify-evenly items-center mt-6 mb-2 gap-3 max-w-2xl">
    <Image
      src={Booking2_3_4}
      alt="Booking2_3_4"
      width={200}
      height={200}
      className="shadow-lg rounded-lg"
    />
  </div>
</div> */}
export default DocsBooking;
