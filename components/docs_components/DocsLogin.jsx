import { Login1, Login2_3 } from "@public/assets/images";
import Image from "next/image";
import React from "react";

function DocsLogin() {
  return (
    <div className="flex flex-col xl:flex-row w-full">
      <div className="max-w-xl">
        <div className="flex items-center mb-4 gap-3">
          <span className="border-[2.5px] border-red-400 h-12 rounded-full"></span>
          <h1 className="text-3xl font-semibold text-gray-800 ">
            การเข้าสู่ระบบ
          </h1>
        </div>
        <ol className="list-decimal list-inside space-y-3 text-gray-700 text-base ml-10 max-[460px]:ml-4">
          <li>
            กดปุ่ม
            <span className="px-3.5 py-1.5 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none hover:scale-105 active:scale-95 transition duration-150 shadow-red-500/50 font-medium text-[12px] text-center rounded-lg  shadow-md cursor-pointer mx-2">
              เข้าสู่ระบบ
            </span>
            บนเมนู
          </li>
          <li>
            กรอก <span className="font-semibold">อีเมลโรงเรียน</span>{" "}
            (รหัสประจำตัว@satriwit.ac.th เช่น{" "}
            <span className="text-gray-500">00000@satriwit.ac.th</span>) และ{" "}
            <span className="font-semibold">รหัสผ่าน</span> (รหัสประจำตัว_ห้อง
            เช่น <span className="text-gray-500">00000_0.0</span>)
          </li>
          <li>
            กดปุ่ม
            <span className="px-3.5 py-1.5 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none hover:scale-105 active:scale-95 transition duration-150 shadow-red-500/50 font-medium text-[12px] text-center rounded-lg  shadow-md cursor-pointer mx-2">
              เข้าสู่ระบบ
            </span>{" "}
            ใต้แบบฟอร์มเพื่อเข้าใช้งาน
          </li>
        </ol>
      </div>
      <div className="flex flex-col sm:flex-row flex-1 justify-evenly items-center mt-6 gap-3">
        <Image src={Login1} alt="Login1" width={200} height={200} className="shadow-lg" />
        <Image src={Login2_3} alt="Login2_3" width={200} height={200} className="shadow-lg" />
      </div>
    </div>
  );
}

export default DocsLogin;
