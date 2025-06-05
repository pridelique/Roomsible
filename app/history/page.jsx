'use client'
import { useState } from 'react';
function HistoryPage() {
  const [bookings,setBookings]=useState([
    {
      id:1,
      date:'วันจันทร์',
      time:'08.30-09.20',
      room:'1303',
      usage:'การเรียนการสอน',
      detail:'ครูสมชาย วิชาฟิสิกส์ ม.1.1',
      status:'confirmed',
    },
    {
      id:2,
      date:'วันอังคาร',
      time:'09.20-10.10',
      room:'2202',
      usage:'กิจกรรม',
      detail:'ซ้อมการนำเสนอ',
      status:'canceled',
    },
    {
      id:3,
      date:'วันพุธ',
      time:'10.10-11.00',
      room:'7405',
      usage:'กิจกรรม',
      detail:'ประชุมงานกลุ่ม',
      status:'booked',
    },
    {
      id:4,
      date:'วันพุธ',
      time:'10.10-11.00',
      room:'7405',
      usage:'กิจกรรม',
      detail:'ประชุมงานกลุ่ม',
      status:'booked',
    },

  ]);
  //id ที่เปิด menu อยู่
  const [activeMenuId,setActiveMenuId]=useState(null);
  //id ที่เปิดรายละเอียดอยู่
  const [activeDetailId,setActiveDetailId]=useState(null);

  const toggleMenu=(id)=>{
    setActiveMenuId(activeMenuId===id?null:id);
  }
  const cancelBooking=(id)=>{
    setBookings((prev)=>
      prev.map((b)=>
        b.id===id?{...b,status:'canceled'}:b
      ) 
    );
    setActiveMenuId(null);
    setActiveDetailId(null);
  };
  return (
     
    <div className="p-10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">ประวัติการจอง</h2>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">วันที่</th>
              <th className="py-2 px-4">คาบเรียน</th>
              <th className="py-2 px-4">ห้อง</th>
              <th className="py-2 px-4">การใช้งาน</th>
              <th className="py-2 px-4">สถานะ</th>
            </tr>
          </thead>
          <tbody>
              {bookings.map((booking)=>(
                <tr key={booking.id} className="border-b relative">
                  <td className="py-2 px-4">{booking.date}</td>
                  <td className="py-2 px-4">{booking.time}</td>
                  <td className="py-2 px-4">{booking.room}</td>
                  <td className="py-2 px-4">{booking.usage}</td>
                  <td className="py-2 px-4 relative">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        {booking.status==='booked'&&(
                          <div className="text-blue-500">จองแล้ว</div>
                        )}
                        {booking.status==='confirmed'&&(
                          <div className="text-green-600">ยืนยันแล้ว</div>
                        )}
                        {booking.status==='canceled'&&(
                          <div className="text-red-500">ยกเลิก</div>
                        )}
                      </div>
                      <div className="relative">
                        <button className="text-xl px-2 text-gray-600"
                          onClick={()=>toggleMenu(booking.id)}>⋮</button>
                        {activeMenuId===booking.id&&(
                          <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow text-sm z-10">
                            <div  
                              onClick={()=>setActiveDetailId(booking.id)}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer">รายละเอียด</div>
                            <div  
                              onClick={()=>cancelBooking(booking.id)}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer">ยกเลิกการจอง</div>
                          </div>
                        )}
                        {activeDetailId===booking.id&&(
                          <div className="absolute right-36 top-0 w-56 bg-white border rounded shadow text-sm p-4 z-20">
                            <div className="font-medium mb-2">รายละเอียดการจอง</div>
                            <div>{booking.detail}</div>
                            <div
                              onClick={()=>setActiveDetailId(null)}
                              className="text-right text-blue-500 text-xs mt-3 cursor-pointer">ปิด</div>
                            </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              <tr><td colSpan={5} className="py-4" /></tr>
              <tr><td colSpan={5} className="py-4" /></tr>
              <tr><td colSpan={5} className="py-4" /></tr>

            </tbody>
        </table>
      </div>
    </div>

  )
}

export default HistoryPage