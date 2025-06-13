'use client'
import { useState,useEffect,useRef } from 'react';
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
  const menuRefs=useRef({});
  useEffect(()=> {
    const handleClickOutside=(event)=> {
    const isClickInsideAnyMenu=Object.values(menuRefs.current).some(
      (ref)=>ref&&ref.contains(event.target)
    );

    if (!isClickInsideAnyMenu) {
      setActiveMenuId(null);
      setActiveDetailId(null);
    }
  };

  document.addEventListener('click',handleClickOutside);
  return()=> {
    document.removeEventListener('click',handleClickOutside);
    };
  }, []);
  return (
  <div className="relative">
    <img
      src="/assets/images/historyImage.jpg"
      className="w-full h-64 object-cover"/>
      <div className="flex items-center mb-10 relative">
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 shadow-lg z-2">          
          <svg xmlns="http://www.w3.org/2000/svg" className="w-15 h-15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A9.985 9.985 0 0112 15c2.21 0 4.244.715 5.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>
      
      <div className="p-10 max-w-4xl mx-auto flex flex-col">
        <div className="text-gray-700 space-y-1">
          <div className="flex justify-center mb-5 mt-5 bg-white p-3 shadow-md text-sm md:text-lg lg:text-2xl">
            <div className="text-center">
              <div>นางสาวชนัญธิดา ธนะสารสมบูรณ์</div>
              <div className="text-base text-gray-500">ม.6.8</div>
              </div>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 ml-7">ประวัติการจอง</h2>
    <div className="flex flex-col items-center">
      <div className="overflow-x-auto w-full border border-gray-300 shadow-md rounded-md custom-scroll">
        <table className="w-full text-center">
          <thead className="bg-gray-100 text-gray-700 text-base sm:text-lg">
            <tr>
              <th className="py-2 px-1">วันที่</th>
              <th className="py-2 px-1">คาบเรียน</th>
              <th className="py-2 px-1">ห้อง</th>
              <th className="py-2 px-1">การใช้งาน</th>
              <th className="py-2 px-1">สถานะ</th>
              <th className="py-2 px-1">{}</th>
            </tr>
          </thead>
          <tbody className="text-gray-500 text-base sm:text-md md:text-lg">
              {bookings.map((booking)=>(
                <tr key={booking.id} className="border-b relative">
                  <td className="py-2 px-1">{booking.date}</td>
                  <td className="py-2 px-1">{booking.time}</td>
                  <td className="py-2 px-1">{booking.room}</td>
                  <td className="py-2 px-1">{booking.usage}</td>
                  <td className="py-2 px-1 relative text-center">
                    <div className="items-center justify-between">
                      <div className="sm:text-md md:text-lg ">
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
                    </div>
                  </td>
                  <td className="py-2 px-1 relative text-center">
                    <div className="items-center justify-between">
                      <div className="relative top-1 right-2" ref={(el)=>(menuRefs.current[booking.id]=el)}>
                        <button className="text-xl px-2 text-gray-600"
                          onClick={()=>toggleMenu(booking.id)}>⋮</button>
                        {activeMenuId===booking.id&&(
                          <div className="-translate-y-3 absolute right-0 mt-2 w-36 bg-white border border-gray-400 rounded shadow-md text-sm z-2">
                            <div  
                              onClick={()=>setActiveDetailId(booking.id)}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer">รายละเอียด</div>
                            <div  
                              onClick={()=>cancelBooking(booking.id)}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer">ยกเลิกการจอง</div>
                          </div>
                        )}
                        {activeDetailId===booking.id&&(
                          <div className="-translate-y-8 translate-x-20 z-3 absolute right-36 top-0 w-56 bg-white border rounded shadow-md text-sm p-4 border-gray-400">
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

            </tbody>
        </table>
      </div>
    </div>
    </div>
  </div>
  )
}

export default HistoryPage