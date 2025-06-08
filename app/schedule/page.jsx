import React from 'react';
import '../globals.css';
function Schedule() {
    const days=['วันจันทร์','วันอังคาร','วันพุธ','วันพฤหัสบดี','วันศุกร์'];
    const timeSlots=Array.from({length:9},(_,i)=> {
        const startMinutes=8*60+30+i*50;
        const endMinutes=startMinutes+50;

        const formatTime=(mins)=>{
            const h=Math.floor(mins/60);
            const m=mins%60;
            return `${h}:${m.toString().padStart(2,'0')}`;
        };

        return {
            label:`คาบที่ ${i + 1}`,
            time:`(${formatTime(startMinutes)}–${formatTime(endMinutes)})`,
        };
    });
    return (
    <div>
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold mb-10 mt-5">ตารางเวลา ตึกเอกอำนวยการ : ห้อง 1303</h2>    
        <div className="overflow-x-auto border border-gray-300 shadow-md rounded-md custom-scroll">
            <div
                className="w-full border border-gray-300"
                style={{
                    display:"grid",
                    gridTemplateColumns:`100px repeat(${timeSlots.length},120px)`,
                    gridTemplateRows:`60px repeat(${days.length},60px)`,
            }}>
                <div className="border border-gray-300 flex items-center justify-center font-bold bg-white">วัน/เวลา</div>
                {timeSlots.map((period,index)=> (
                    <div key={index} className="border border-gray-300 flex flex-col items-center justify-center font-bold bg-white text-sm px-1 text-center">
                        <div className="text-gray-700">{period.label}</div>
                        <div className="text-xs text-gray-500">{period.time}</div>
                    </div>
                ))}

                {days.map((day)=> (
                    <React.Fragment key={day}>
                        <div className="border border-gray-300 flex items-center justify-center font-semibold bg-white">{day}</div>
                        {timeSlots.map((_,index)=> (
                            <div key={`${day}-${index}`} className="border border-gray-200 bg-red-200 hover:bg-blue-50"></div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    </div>
    )
}
export default Schedule;