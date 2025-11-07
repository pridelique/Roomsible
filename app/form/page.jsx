"use client";
import { useContext, useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "@node_modules/next/navigation";
import { Warning } from "@public/assets/icons";
import { subjectOptions, roomOptions } from "@data";
import "@app/globals.css";
import ErrorBox from "@components/ErrorBox";
import OptionInput from "@components/form_components/OptionInput";
import ModeSelection from "@components/form_components/ModeSelection";
import Loading from "@components/Loading";
import { SessionContext } from "@provider/SessionProvider";
import { bookingError } from "@data/bookingError";
import { dayEnToThai } from "@utils/translateDay";
import { isBookable } from "@utils/isBookable";
import SuccessCard from "@components/SuccessCard";
import { ArrowRight, CalendarDays, Clock } from "@node_modules/lucide-react";
import { customStyles } from "@data/form";


function BookingForm() {
  const [mode, setMode] = useState("");
  const [teacher, setTeacher] = useState("");
  const [subject, setSubject] = useState("");
  const [studentClass, setStudentRoom] = useState("");
  const [activityDetail, setActivityDetail] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { user } = useContext(SessionContext);
  const [role, setRole] = useState(user?.app_metadata?.role || "student");

  const searchParams = useSearchParams();
  const buildingId = searchParams.get("building") || "0";
  const room = searchParams.get("room") || "0";
  const period = searchParams.get("period") || "1";
  const day = searchParams.get("day") || "monday";
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "class") {
      if (!teacher || !subject || !studentClass) {
        setErrorMessage("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
      }
    } else {
      if (!activityDetail) {
        setErrorMessage("กรุณากรอกรายละเอียดกิจกรรม");
        return;
      }
    }

    setLoading(true);
    setIsSubmiting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room,
          building: buildingId,
          period,
          day,
          type: mode,
          teacher,
          studentClass,
          subject,
          detail: activityDetail,
        }),
      });
      const data = await res.json();
      // console.log(data);

      if (res.ok) {
        setSuccess("จองห้องเรียนสำเร็จ");
        setError(null);
      } else {
        if (data.message === "Already booked") {
          setError(bookingError.booked);
        } else if (data.message === "No Permission") {
          setError(bookingError.noPermission);
        } else if (data.message === "Banned") {
          setError(bookingError.banned);
        } else {
          setError(bookingError.default);
        }
        setSuccess(null);
      }
    } catch (error) {
      console.error("Error during booking:", error);
      setError(bookingError.default);
      setSuccess(null);
    }
    setLoading(false);
  };

  // เปลี่ยนโหมดแล้วล้าง errorMessage
  useEffect(() => {
    setErrorMessage("");
  }, [mode]);

  // ถ้ากรอกข้อมูลครบถ้วนแล้ว ให้ล้าง errorMessage
  useEffect(() => {
    if (mode === "class") {
      if (teacher && subject && studentClass) {
        setErrorMessage("");
      }
    } else {
      if (activityDetail) {
        setErrorMessage("");
      }
    }
  }, [teacher, subject, studentClass, activityDetail]);

  // ตรวจสอบสิทธิ์ของผู้ใช้
  useEffect(() => {
    if (user && user != "loading") {
      setTimeout(() => {
        setRole(user?.app_metadata?.role || "student");
        setPageLoading(false);
      }, 200);
    }
  }, [user]);

  useEffect(() => {
    if (
      isBookable(day, period, role, "class") &&
      !isBookable(day, period, role, "activity")
    ) {
      setMode("class");
    } else setMode("activity");
  }, [day, period, role]);

  return (
    <section className="flex max-container w-full pt-4 max-[460px]:pt-0 flex-1 max-[380px]:bg-white">
      {isSubmiting ? (
        <>
          {loading && <Loading />}
          {error && (
            <ErrorBox
              Svg={Warning}
              handleOnclick={() => router.back()}
              {...error}
            />
          )}

          {success && (
            <SuccessCard
              room={room}
              day={day}
              period={period}
              buildingId={buildingId}
              type="booking"
              mode={mode}
            />
          )}
        </>
      ) : (
        <div className="bg-white px-7 sm:px-10 py-9 sm:py-12  rounded-3xl shadow-xl w-full max-w-md mx-auto flex flex-col items-center max-[460px]:border-none max-[460px]:shadow-none max-[460px]:rounded-none min-[460px]:h-fit max-[460px]:flex-1 min-[460px]:my-auto">
          {/* Header */}
          <div className="w-full flex flex-col items-center mb-5 text-center">
            {/* Room Name */}
            <h2 className="text-[2.5rem] font-bold text-gray-800">
              {room.startsWith("ห้อง") ? room : `ห้อง ${room}`}
            </h2>
            {/* Info Row */}
            <div className="flex items-center justify-center gap-2 sm:gap-5 text-gray-500 relative w-full mt-2">
              <span className="flex items-center gap-2 w-fit">
                <CalendarDays className="w-5 h-5 text-red-400" />
                <span className="text-base font-medium">
                  {dayEnToThai[day]}
                </span>
              </span>
              <span className=" block text-gray-300 text-xl select-none w-fit">
                |
              </span>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-400" />
                <span className="text-base font-medium">คาบที่ {period}</span>
              </div>
            </div>
          </div>
          {pageLoading || false ? (
            <>
              {/* Room
              <div className="h-8 w-30 mb-2 bg-gray-300 animate-pulse rounded-full"></div>
              
              day period
              <div className="text-center mb-7 text-gray-600 text-lg flex flex-row max-[450px]:flex-col justify-center items-center gap-x-2">
              <div className="w-30 h-5 bg-gray-300/80 animate-pulse rounded-full"></div>
              <div className="w-40 h-5 bg-gray-300/80 animate-pulse rounded-full"></div>
              </div> */}

              {/* Mode */}
              <div className="flex justify-center items-center mb-4 gap-2 max-[450px]:hidden">
                <div className="w-40 h-[29.5px] bg-gray-300/80 animate-pulse rounded-full"></div>
                <div className="w-22 h-[29.5px] bg-gray-300/80 animate-pulse rounded-full"></div>
              </div>
              <div className="max-[450px]:block hidden w-19 h-2 bg-gray-300/80 animate-pulse rounded-full"></div>

              {/* Form */}
              <div className=" mx-auto block mt-2 w-full">
                <div className="w-25 h-6 bg-gray-300/80 animate-pulse rounded-full mb-1"></div>
                <div className="w-full h-[41.5px] bg-gray-300/80 animate-pulse rounded-full"></div>
              </div>

              {/* button */}
              <button
                type="submit"
                disabled={loading} // 2. Add disabled attribute
                className="group relative w-full flex justify-center items-center text-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-red-500/50 text-center cursor-pointer py-3 rounded-2xl mx-auto mt-6 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span>ยืนยันการจอง</span>
                <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-active:translate-x-1" />
              </button>
            </>
          ) : (
            <>
              <ModeSelection
                mode={mode}
                setMode={setMode}
                role={role}
                disabledActivity={!isBookable(day, period, role, "activity")}
                disabledClass={!isBookable(day, period, role, "class")}
              />
              <form onSubmit={(e) => handleSubmit(e)} className="w-full">
                {mode === "class" ? (
                  <div className="space-y-4  mx-auto block mt-2">
                    <div>
                      <label className="block font-semibold mb-2 text-gray-700">
                        ครูผู้สอน
                      </label>
                      <input
                        type="text"
                        className="block w-full border-2 border-slate-200 bg-slate-50 rounded-xl px-4 py-[10.8px] focus:outline-none focus:ring-1 ring-gray-200 transition disabled:opacity-50 text-base font-[500] text-[#1f2937]"
                        placeholder="เช่น อ.สมชาย ใจดี"
                        value={teacher}
                        maxLength={50}
                        onChange={(e) => setTeacher(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                      {/* รายวิชา */}
                      <OptionInput
                        title="รายวิชา"
                        options={subjectOptions}
                        customStyles={customStyles}
                        setValue={setSubject}
                        value={subject}
                      />

                      {/* ห้องที่สอน */}
                      <OptionInput
                        title="ห้องที่สอน"
                        options={roomOptions}
                        customStyles={customStyles}
                        setValue={setStudentRoom}
                        value={studentClass}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block font-semibold mb-2 text-gray-700">
                      รายละเอียดกิจกรรม
                    </label>
                    <input
                      type="text"
                      className="block w-full border-2 border-slate-200 bg-slate-50 rounded-xl px-4 py-[10.8px] focus:outline-none focus:ring-1 ring-gray-200 transition disabled:opacity-50 text-base font-[500] text-[#1f2937]"
                      placeholder="เช่น ประชุมเชียร์, ซ้อมการแสดง..."
                      value={activityDetail}
                      maxLength={100}
                      onChange={(e) => setActivityDetail(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                )}

                {errorMessage && (
                  <div className="flex gap-2 justify-start items-center mt-3">
                    <Warning className="w-5 h-5 text-red-500" />
                    <p className="text-red-500 text-[12px] text-start whitespace-pre-line">
                      {errorMessage}
                    </p>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading} // 2. Add disabled attribute
                  className="group relative w-full flex justify-center items-center text-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-red-500/50 text-center cursor-pointer py-3 rounded-2xl mx-auto mt-6 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span>ยืนยันการจอง</span>
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-2" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </section>
  );
}
export default function FormPage() {
  return (
    <Suspense fallback={<Loading />}>
      <BookingForm />
    </Suspense>
  );
}
