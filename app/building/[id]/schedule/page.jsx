"use client";
import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import "@app/globals.css";
import { statusColors, timeSlots } from "@data";
import StatusLabel from "@components/building_components/StatusLabel";
import { SessionContext } from "@provider/SessionProvider";
import { notifyWaring } from "@utils/notify";
import { supabase } from "@/utils/supabase";
import { getCurrentDay, getCurrentPeriod } from "@utils/currentDayPeriod";
import { dayEnToThai, dayThaiToEn } from "@utils/translateDay";
import { isBookable } from "@utils/isBookable";
import { CalendarPlus } from "@node_modules/lucide-react";

function Schedule() {
  const router = useRouter();
  const param = useParams();
  const searchParams = useSearchParams();
  const buildingId = param.id;
  const room = searchParams.get("room");

  const { user } = useContext(SessionContext);

  const innerRef = useRef(null);
  const [maxWidth, setMaxWidth] = useState(0);
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(true);

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  const filteredTimeSlots = timeSlots.filter(
    (slot) => slot.label >= 1 && slot.label <= 10
  );

  const handleOnClick = (day, period) => {
    if (!user) {
      notifyWaring("กรุณาเข้าสู่ระบบก่อนทำการจองห้องเรียน");
      return;
    }
    router.push(
      `/form?building=${buildingId}&room=${room}&day=${day}&period=${period.label}`
    );
  };

  useEffect(() => {
    const handleResize = () => {
      const inner = innerRef.current;
      if (!inner) return;
      const innerWidth = inner.offsetWidth;
      setMaxWidth(innerWidth);
    };
    handleResize();
  }, []);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!room) return;
      setLoading(true);
      const currentDay = getCurrentDay("eng");
      const currentPeriod = getCurrentPeriod();

      const { data, error } = await supabase
        .from("bookings")
        .select("day, period, status")
        .eq("room", room);

      if (error) {
        console.error("Error fetching booking:", error.message);
        setLoading(false);
        return;
      }

      const bookedMap = {};
      data.forEach((item) => {
        bookedMap[`${item.day}-${item.period}`] = item.status;
      });

      const newStatus = {};
      days.forEach((day) => {
        filteredTimeSlots.forEach((period) => {
          const key = `${day}-${period.label}`;
          const bookingStatus = bookedMap[key];

          if (!bookingStatus) {
            newStatus[`${day}-${period.label}`] = "available";
          } else if (
            bookingStatus === "pending" &&
            day === currentDay &&
            period.label === currentPeriod
          ) {
            newStatus[`${day}-${period.label}`] = "pending-now";
          } else {
            newStatus[`${day}-${period.label}`] = "booked";
          }
        });
        setLoading(false);
      });

      setStatus(newStatus);
    };

    fetchStatus();
  }, [room]);

  return (
    // <section className="padding-x max-container w-full pt-6">
    //   <div className="text-center mb-4">
    //     <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-600">
    //       ตารางการใช้งานห้อง {room}
    //     </h2>
    //     <p className="text-slate-gray max-w-md mx-auto mt-2 text-sm md:text-base">
    //       เลือกห้องที่ว่างเพื่อจองห้องเรียนในช่วงเวลาที่ต้องการ
    //     </p>
    //   </div>

    //     <div
    //       className="bg-white overflow-x-auto shadow-md rounded-md custom-scroll mx-auto max-w-[1300px] w-full overscroll-contain"
    //       // style={{ maxWidth: maxWidth + 2 }}
    //     >
    //       <div
    //         className="w-fit rounded-lg border-2 border-gray-300 overflow-hidden"
    //         style={{
    //           display: "grid",
    //           gridTemplateColumns: `100px repeat(${filteredTimeSlots.length},120px)`,
    //           gridTemplateRows: `60px repeat(${days.length},60px)`,
    //         }}
    //         ref={innerRef}
    //       >
    //         {/* หัวตาราง */}
    //         <div className="border-r-1 border-b-1 border-gray-300 text-gray-700 flex items-center justify-center font-semibold bg-white">
    //           วัน/เวลา
    //         </div>
    //         {filteredTimeSlots.map((period, index) => (
    //           <div
    //             key={`header-${index}`}
    //             className={`border border-t-0 ${
    //               period.label == 10 && "border-r-0"
    //             } border-gray-300 flex flex-col items-center justify-center bg-white text-sm px-1 text-center`}
    //           >
    //             <div className="text-gray-700">คาบที่ {period.label}</div>
    //             <div className="text-xs text-gray-500 mt-0.5">
    //               {period.from} - {period.to}
    //             </div>
    //           </div>
    //         ))}

    //         {/* แถวแต่ละวัน */}
    //         {days.map((day) => (
    //           <React.Fragment key={day}>
    //             <div
    //               className={`border border-l-0 ${day == 'friday' && "border-b-0"} border-gray-300 flex items-center justify-center bg-white text-gray-700`}
    //             >
    //               {dayEnToThai[day]}
    //             </div>
    //             {filteredTimeSlots.map((period) => {
    //               const key = `${day}-${period.label}`;
    //               const cellStatus = status[key];

    //               let bgColor = "bg-white";
    //               if (cellStatus === "available") {
    //                 bgColor = "bg-[#86EFAC] hover:bg-[#4ADE80] cursor-pointer";
    //               } else if (cellStatus === "pending-now") {
    //                 bgColor = "bg-[#FACC15]"; // เหลือง
    //               } else if (cellStatus === "booked") {
    //                 bgColor = "bg-[#FCA5A5]"; // แดง
    //               }

    //               if (loading )
    //                 return (
    //                   <div
    //                     key={key}
    //                     className={`border border-gray-300`}
    //                   >
    //                     <div className="bg-gray-200 animate-pulse h-full w-full"></div>
    //                   </div>
    //                 );
    //               console.log(day, String(period.label), user?.app_metadata?.role);

    //               return (
    //                 <button
    //                   key={key}
    //                   disabled={
    //                     !isBookable(
    //                       day,
    //                       period.label,
    //                       user?.app_metadata?.role
    //                     )
    //                   }
    //                   className={`border border-gray-300
    //                     ${period.label == 10 && "border-r-0" }
    //                     ${day == 'friday' && "border-b-0"}
    //                     ${bgColor} disabled:bg-black cursor-pointer`}
    //                   onClick={
    //                     cellStatus == "available"
    //                       ? () => handleOnClick(day, period)
    //                       : undefined
    //                   }
    //                 />
    //               );
    //             })}
    //           </React.Fragment>
    //         ))}
    //       </div>
    //     </div>

    //   <div className="flex max-w-xl w-fit gap-6 mx-auto mt-6">
    //     <StatusLabel statusThai={"ว่าง"} color={statusColors.available} />
    //     <StatusLabel statusThai={"ไม่ว่าง"} color={statusColors.booked} />
    //     <StatusLabel statusThai={"รออนุมัติ"} color={"#FACC15"} />
    //   </div>
    // </section>
    <section className="min-[460px]:px-4 min-[460px]:py-6 max-container w-full">
      <div className="bg-white rounded-lg shadow-lg px-6 py-4 w-full mx-auto max-w-[1200px]">
        {/* <div className="text-center mb-4">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-600">
            ตารางการใช้งานห้อง {room}
          </h2>
          <p className="text-slate-gray max-w-md mx-auto mt-2 text-sm md:text-base">
            เลือกห้องที่ว่างเพื่อจองห้องเรียนในช่วงเวลาที่ต้องการ
          </p>
        </div> */}

        <header className="relative p-8 md:p-12 rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 mb-8">
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-white opacity-10 rounded-full transform rotate-45"></div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white opacity-10 rounded-full transform -rotate-45"></div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <div className="p-5 rounded-full bg-white/20 bg-opacity-20 backdrop-filter backdrop-blur-sm mb-4">
              <CalendarPlus className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-semibold text-white tracking-tight">
              ห้องเรียน 402
            </h1>
            <p className="text-lg text-white mt-1">ระบบจองห้องเรียนออนไลน์</p>
          </div>
        </header>

        <div className="overflow-x-auto custom-scroll pb-1.5">
          <div className="absolute w-fit bg-white text-gray-700 space-y-1">
            <div className="px-2 flex justify-center items-center h-15">
              วัน/เวลา
            </div>
            {days.map((day) => (
              <div
                key={day}
                className="px-2 h-13 flex justify-end items-center"
              >
                {dayEnToThai[day].replace("วัน", "")}
              </div>
            ))}
          </div>
          <div className="w-fit ml-25 space-y-1">
            <div className="flex gap-1">
              {filteredTimeSlots.map((period) => (
                <div key={period.label} className="p-2 text-center w-25 h-15">
                  <div className="text-gray-700">คาบที่ {period.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5 whitespace-nowrap">
                    {period.from} - {period.to}
                  </div>
                </div>
              ))}
            </div>
            {days.map((day) => (
              <div className="flex gap-1" key={day}>
                {filteredTimeSlots.map((period) => {
                  const key = `${day}-${period.label}`;
                  const cellStatus = status[key];

                  let bgColor = "bg-white";
                  if (isBookable(day, period.label, user?.app_metadata?.role)) {
                    if (cellStatus === "available") {
                      bgColor =
                        "bg-green-300 hover:bg-green-400 active:bg-green-500 cursor-pointer hover:scale-105 active:scale-95 transition duration-150";
                    } else if (cellStatus === "pending-now") {
                      bgColor = "bg-yellow-300"; // เหลือง
                    } else if (cellStatus === "booked") {
                      bgColor = "bg-red-300"; // แดง
                    }
                  } else {
                    if (cellStatus === "available") {
                      bgColor = "bg-green-300/50";
                    } else if (cellStatus === "pending-now") {
                      bgColor = "bg-yellow-300/50"; // เหลือง
                    } else if (cellStatus === "booked") {
                      bgColor = "bg-red-300/50"; // แดง
                    }
                  }

                  if (loading)
                    return (
                      <div
                        key={key}
                        className={`bg-gray-200 animate-pulse w-25 h-13 rounded-lg`}
                      ></div>
                    );
                  console.log(
                    day,
                    String(period.label),
                    user?.app_metadata?.role
                  );

                  return (
                    <button
                      key={key}
                      disabled={
                        !isBookable(day, period.label, user?.app_metadata?.role)
                      }
                      className={`rounded-lg w-25 h-13
                      ${bgColor} cursor-pointer`}
                      onClick={
                        cellStatus == "available"
                          ? () => handleOnClick(day, period)
                          : undefined
                      }
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-200 w-full my-5"></div>

        <div>
          <p className="text-lg font-semibold">สถานะการจอง</p>
          <div className="flex max-w-xl w-fit mx-auto gap-6 mt-6">
            <StatusLabel statusThai={"ว่าง"} color={statusColors.available} />
            <StatusLabel statusThai={"ไม่ว่าง"} color={statusColors.booked} />
            <StatusLabel statusThai={"รออนุมัติ"} color={"#FACC15"} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Schedule;
