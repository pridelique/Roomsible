import React from 'react'

function DocsCancel() {
  return (
    <div className="max-w-xl">
      <div className="flex items-center mb-4 gap-3">
        <span className="border-[2.5px] border-red-400 h-12 rounded-full"></span>
        <h1 className="text-3xl font-semibold text-gray-800">
          ยกเลิกการจอง
        </h1>
      </div>
      <ol className="list-decimal list-inside space-y-3 text-gray-700 text-base ml-10 max-[460px]:ml-4">
        <li>
          ไปที่เมนู{" "}
          <span className='font-semibold'>ประวัติ</span>
        </li>
        <li>
          กดปุ่ม{" "}
          <span className="px-2 py-1 text-gray-700 bg-gray-100 text-[13px] text-center rounded-lg shadow cursor-pointer mx-2 font-bold">
            ⁝ 
          </span>{" "}
          ในรายการที่ต้องการยกเลิก
        </li>
        <li>
          เลือก{" "}
          <span className="font-semibold">
            ยกเลิกการจอง
          </span>
        </li>
        <li>
          กด{" "}
          <span className="px-3.5 py-1.5 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 font-medium text-[12px] text-center rounded-lg shadow-md cursor-pointer mx-2">
            ยืนยัน
          </span>
        </li>
        <li>
          หากยกเลิกสำเร็จ รายการจะถูกลบออกจากตาราง
        </li>
      </ol>
      <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded flex items-center gap-2">
        <span className="text-2xl">⚠️</span>
        <div>
          หากถึงคาบที่จอง{" "}
          <span className="font-semibold text-red-600">
             จะไม่สามารถยกเลิกได้
          </span>{" "}
        </div>
      </div>
    </div>
  )
}

export default DocsCancel