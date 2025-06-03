"use client";
import buildings from "@data/buildings";
import Room from "./Room";
import React from "react";

function Building({ id }) {
  console.log(id);
  
  console.log(buildings);
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  const timeSlots = Array.from({ length: 14 }, (_, i) => i + 8); // 8 - 21

  return (
    <div className="overflow-x-auto border rounded-md">
      <div className="min-w-[1000px] grid grid-cols-[100px_repeat(14,80px)] grid-rows-[40px_repeat(5,60px)] border border-gray-300">
        {/* Header Row */}
        <div className="border border-gray-300 flex items-center justify-center font-bold bg-white">Day/Time</div>
        {timeSlots.map((hour) => (
          <div key={hour} className="border border-gray-300 flex items-center justify-center font-bold bg-white">
            {hour}
          </div>
        ))}
        {buildings[id]["rooms"].map((row, index) => (
        <div
          key={index}
          className='grid gap-2'
          style={{gridTemplateColumns: `repeat(${buildings[id]["col"]}, minmax(0, 1fr))`,}}
        >
          {row.map((room, index) => (
            <Room {...room} key={index}/>
          ))}
        </div>
      ))}
        <React.Fragment>
          
        </React.Fragment>

        {/* Grid Rows */}
        <div className="flex flex-col gap-2 max-w-lg mx-auto ">
      {buildings[id]["rooms"].map((row, index) => (
        <div
          key={index}
          className='grid gap-2'
          style={{gridTemplateColumns: `repeat(${buildings[id]["col"]}, minmax(0, 1fr))`,}}
        >
          {row.map((room, index) => (
            <Room {...room} key={index}/>
          ))}
        </div>
      ))}
    </div>
        {/* {days.map((day) => (
          <React.Fragment key={day}>
            <div className="border border-gray-300 flex items-center justify-center font-bold bg-white">{day}</div>
            {timeSlots.map((hour) => (
              <div key={`${day}-${hour}`} className="border border-gray-200 hover:bg-blue-50"></div>
            ))}
          </React.Fragment>
        ))} */}
      </div>
    </div>
    // <div className="flex flex-col gap-2 max-w-lg mx-auto ">
    //   {building[id]["rooms"].map((row, index) => (
    //     <div
    //       key={index}
    //       className='grid gap-2'
    //       style={{gridTemplateColumns: `repeat(${building[id]["col"]}, minmax(0, 1fr))`,}}
    //     >
    //       {row.map((room, index) => (
    //         <Room {...room} key={index}/>
    //       ))}
    //     </div>
    //   ))}
    // </div>
  );
}

export default Building;
