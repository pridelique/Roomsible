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
      `/building/${buildingId}/schedule/form?room=${room}&day=${day}&period=${period.label}`
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
    <section className="padding-x max-container w-full pt-6">
      <div className="text-center mb-4">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-600">
          ตารางการใช้งานห้อง {room}
        </h2>
        <p className="text-slate-gray max-w-md mx-auto mt-2 text-sm md:text-base">
          เลือกห้องที่ว่างเพื่อจองห้องเรียนในช่วงเวลาที่ต้องการ
        </p>
      </div>

        <div
          className="bg-white overflow-x-auto shadow-md rounded-md custom-scroll mx-auto max-w-[1300px] w-full"
          // style={{ maxWidth: maxWidth + 2 }}
        >
          <div
            className="w-fit rounded-lg border-2 border-gray-300 overflow-hidden"
            style={{
              display: "grid",
              gridTemplateColumns: `100px repeat(${filteredTimeSlots.length},120px)`,
              gridTemplateRows: `60px repeat(${days.length},60px)`,
            }}
            ref={innerRef}
          >
            {/* หัวตาราง */}
            <div className="border-r-1 border-b-1 border-gray-300 text-gray-700 flex items-center justify-center font-semibold bg-white">
              วัน/เวลา
            </div>
            {filteredTimeSlots.map((period, index) => (
              <div
                key={`header-${index}`}
                className={`border border-t-0 ${
                  period.label == 10 && "border-r-0"
                } border-gray-300 flex flex-col items-center justify-center bg-white text-sm px-1 text-center`}
              >
                <div className="text-gray-700">คาบที่ {period.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {period.from} - {period.to}
                </div>
              </div>
            ))}

            {/* แถวแต่ละวัน */}
            {days.map((day) => (
              <React.Fragment key={day}>
                <div
                  className={`border border-l-0 ${day == 'friday' && "border-b-0"} border-gray-300 flex items-center justify-center bg-white text-gray-700`}
                >
                  {dayEnToThai[day]}
                </div>
                {filteredTimeSlots.map((period) => {
                  const key = `${day}-${period.label}`;                  
                  const cellStatus = status[key];
                  
                  let bgColor = "bg-white";
                  if (cellStatus === "available") {
                    bgColor = "bg-[#86EFAC] hover:bg-[#4ADE80] cursor-pointer";
                  } else if (cellStatus === "pending-now") {
                    bgColor = "bg-[#FACC15]"; // เหลือง
                  } else if (cellStatus === "booked") {
                    bgColor = "bg-[#FCA5A5]"; // แดง
                  }

                  if (loading )
                    return (
                      <div
                        key={key}
                        className={`border border-gray-300`}
                      >
                        <div className="bg-gray-200 animate-pulse h-full w-full"></div>
                      </div>
                    );

                  return (
                    <button
                      key={key}
                      disabled={
                        !isBookable(
                          day,
                          period.label,
                          user?.app_metadata?.role
                        )
                      }
                      className={`border border-gray-300
                        ${period.label == 10 && "border-r-0" } 
                        ${day == 'friday' && "border-b-0"} 
                        ${bgColor} disabled:bg-black cursor-pointer`}
                      onClick={
                        cellStatus == "available"
                          ? () => handleOnClick(day, period)
                          : undefined
                      }
                    />
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

      <div className="flex max-w-xl w-fit gap-6 mx-auto mt-6">
        <StatusLabel statusThai={"ว่าง"} color={statusColors.available} />
        <StatusLabel statusThai={"ไม่ว่าง"} color={statusColors.booked} />
        <StatusLabel statusThai={"รออนุมัติ"} color={"#FACC15"} />
      </div>
    </section>
  );
}

export default Schedule;
