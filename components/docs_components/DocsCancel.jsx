import Image from "@node_modules/next/image";
import { Cancel1, Cancel2, Cancel3, Cancel4 } from "@public/assets/images";
import React from "react";

/* <div className="flex flex-col w-full">
  <div className="ml-10 max-[460px]:ml-4 space-y-3 max-w-xl">
    
  </div>

  <div className="flex flex-col sm:flex-row flex-1 justify-evenly items-center mt-6 mb-2 gap-3 max-w-xl">
    <Image
      src={Cancel1}
      alt="Cancel1"
      width={200}
      height={200}
      className="shadow-lg rounded-lg"
    />
  </div>
</div> */

function DocsCancel() {
  return (
    <div className="w-full">
      <div className="flex items-center mb-4 gap-3">
        <span className="border-[2.5px] border-red-400 h-12 rounded-full"></span>
        <h1 className="text-3xl font-semibold text-gray-800">ยกเลิกการจอง</h1>
      </div>
      <ol className="list-decimal list-inside space-y-3 text-gray-700 text-base">
        {/* 1 2 */}
        <div className="flex flex-col w-full">
          <div className="ml-10 max-[460px]:ml-4 space-y-3 max-w-xl">
            <li>
              ไปที่เมนู <span className="font-semibold">ประวัติ</span>
            </li>
            <li>
              กดปุ่ม{" "}
              <span className="px-2 py-1 text-gray-700 bg-gray-100 text-[13px] text-center rounded-lg shadow cursor-pointer mx-2 font-bold">
                ⁝
              </span>{" "}
              ในรายการที่ต้องการยกเลิก
            </li>
          </div>
          <div className="flex flex-col sm:flex-row flex-1 justify-evenly items-center mt-6 mb-2 gap-3 max-w-xl">
            <Image
              src={Cancel1}
              alt="Cancel1"
              width={200}
              height={200}
              className="shadow-lg rounded-lg"
            />
            <Image
              src={Cancel2}
              alt="Cancel2"
              width={200}
              height={200}
              className="shadow-lg rounded-lg"
            />
          </div>
        </div>

        {/* 3 4 5 */}
        <div className="flex flex-col w-full">
          <div className="ml-10 max-[460px]:ml-4 space-y-3 max-w-xl">
            <li>
              เลือก <span className="font-semibold">ยกเลิกการจอง</span>
            </li>
            <li>
              กด{" "}
              <span className="px-3.5 py-1.5 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 font-medium text-[12px] text-center rounded-lg shadow-md cursor-pointer mx-2">
                ยืนยัน
              </span>
            </li>
            <li>หากยกเลิกสำเร็จ รายการจะถูกลบออกจากตาราง</li>
          </div>

          <div className="flex flex-col sm:flex-row flex-1 justify-evenly items-center mt-6 mb-2 gap-3 max-w-xl">
            <Image
              src={Cancel3}
              alt="Cancel3"
              width={200}
              height={200}
              className="shadow-lg rounded-lg"
            />
            <Image
              src={Cancel4}
              alt="Cancel4"
              width={200}
              height={200}
              className="shadow-lg rounded-lg"
            />
          </div>
        </div>
      </ol>
      <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded flex items-center gap-2 max-w-xl">
        <span className="text-2xl">⚠️</span>
        <div>
          หากถึงคาบที่จอง{" "}
          <span className="font-semibold text-red-600">
            จะไม่สามารถยกเลิกได้
          </span>{" "}
        </div>
      </div>
    </div>
  );
}

export default DocsCancel;
