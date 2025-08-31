import React from "react";
import DocsLink from "./DocsLink";

function DocsCheckin() {
  return (
    <div className="max-w-xl">
      <div className="flex items-center mb-4 gap-3">
        <span className="border-[2.5px] border-red-400 h-12 rounded-full"></span>
        <h1 className="text-3xl font-semibold text-gray-800">การเช็คอิน</h1>
      </div>
      <div className="text-gray-600 ml-10 max-[460px]:ml-4 mb-4">
        <span className="font-semibold">การเช็คอิน</span> คือ
        การยืนยันการใช้ห้องเรียน ของผู้ใช้ก่อนเข้าใช้งานห้องเรียน
        โดยผู้ใช้ต้องทำการเช็คอินภายในเวลาที่กำหนดตาม{" "}
        <DocsLink to="checkin-condition" content="เงื่อนไข" />
      </div>
      <ol className="list-decimal list-inside space-y-3 text-gray-700 text-base ml-10 max-[460px]:ml-4">
        <li>
          ไปที่เมนู <span className="font-semibold">เช็คอิน</span>
        </li>
        <li>
          สแกน <span className="font-semibold text-blue-600">QR Code</span>{" "}
          ที่หน้าห้อง
        </li>
        <li>หากเช็คอินสำเร็จ จะปรากฏหน้าสำเร็จ</li>
      </ol>
    </div>
  );
}

export default DocsCheckin;
