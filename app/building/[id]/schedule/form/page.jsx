"use client";
import { use, useEffect, useRef, useState } from "react";
import Select from "react-select";
import {
  useParams,
  useRouter,
  useSearchParams,
} from "@node_modules/next/navigation";
import { timeSlots } from "@data";
import { warning, Arrow_down, Warning } from "@public/assets/icons";
import Image from "@node_modules/next/image";
import { buildingImages } from "@public/assets/images";
import { teacherOptions, subjectOptions, roomOptions } from "@data";
import "@app/globals.css";
import Link from "@node_modules/next/link";
import ErrorBox from "@components/ErrorBox";
import OptionInput from "@components/form_components/OptionInput";
import ModeSelection from "@components/form_components/ModeSelection";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#2563eb"
      : state.isFocused
      ? "#e0e7ff"
      : "#fff",
    color: state.isSelected ? "#fff" : "#6d6d6d",
    padding: "9px 15px 9px 15px",
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 2,
    overflow: "hidden",
  }),
  menuList: (provided) => ({
    ...provided,
    paddingTop: 0, // ลบ padding-top
    paddingBottom: 0,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#4a5565",
    fontWeight: 600,
  }),
};

function BookingForm() {
  const [mode, setMode] = useState("class");
  const [teacher, setTeacher] = useState("");
  const [subject, setSubject] = useState("");
  const [studentRoom, setStudentRoom] = useState("");
  const [activityDetail, setActivityDetail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { id } = useParams();
  const searchParams = useSearchParams();
  const roomNumber = searchParams.get("roomNumber") || "0";
  const period = searchParams.get("period") || "1";
  const day = searchParams.get("day") || "วันจันทร์";
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "class") {
      if (!teacher || !subject || !studentRoom) {
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
    setTimeout(() => {
      if (Math.random() > 0.5) {
        setSuccess("จองห้องเรียนสำเร็จ");
        setError(null);
      } else {
        setError("เกิดข้อผิดพลาดในการจองห้องเรียน");
        setSuccess(null);
      }
      setLoading(false);
    }, 1000);
  };

  // เปลี่ยนโหมดแล้วล้าง errorMessage
  useEffect(() => {
    setErrorMessage("");
  },[mode])

  // ถ้ากรอกข้อมูลครบถ้วนแล้ว ให้ล้าง errorMessage
  useEffect(() => {
    if (mode === "class") {
      if (teacher && subject && studentRoom) {
        setErrorMessage("");
      }
    } else {
      if (activityDetail) {
        setErrorMessage("");
      }
    }
  }, [teacher, subject, studentRoom, activityDetail]);

  return (
    <section className="padding-x max-container w-full pt-6 ">
      {isSubmiting ? (
        <>
          {loading && (
            <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
              <div className="border-3 border-gray-100 border-t-3 border-t-red-400 rounded-full p-6 animate-spin shadow-inner"></div>
            </div>
          )}

          {error && (
            <ErrorBox
              src={warning}
              alt="warning"
              header="ขออภัย"
              message="เกิดข้อผิดพลาดในการจองห้องเรียน กรุณาลองใหม่อีกครั้ง"
              handleOnclick={() =>
                router.push(`/building/${id}/schedule?roomNumber=${roomNumber}`)
              }
              buttonText="ย้อนกลับ"
              color="red"
            />
          )}

          {success && (
            <div className="absolute top-1/2 left-1/2 -translate-1/2 flex items-center justify-center text-center w-full px-4">
              <div className="bg-white rounded-3xl shadow-md w-full max-w-sm mx-auto border border-gray-300">
                <Image
                  src={buildingImages[id]}
                  alt="Building"
                  width={448}
                  height={300}
                  className="rounded-t-3xl mb-2"
                />
                <div className="p-4 pb-8">
                  <div className="text-3xl font-semibold mb-4 text-green-600">
                    การจองสำเร็จ
                  </div>
                  <p className="text-gray-600 mt-2">
                    คุณได้จองห้อง {roomNumber} ใน{day} คาบที่ {period}{" "}
                    เรียบร้อยแล้ว
                    กรุณาตรวจสอบรายละเอียดการจองอีกครั้งในหน้าประวัติ
                  </p>
                  <p></p>
                  <hr className="w-full border border-gray-300 my-6" />
                  <Link
                    href="/"
                    className=" py-2 rounded-full shadow-sm mx-auto block
                       bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:outline-none shadow-green-500/50 text-white cursor-pointer"
                  >
                    กลับหน้าแรก
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white px-7 sm:px-10 py-9 sm:py-12  rounded-3xl shadow-md w-full max-w-md mx-auto border border-gray-300 flex flex-col items-center">
          <h2 className="text-3xl font-semibold text-center mb-2 text-gray-700">
            ห้อง {roomNumber}
          </h2>
          <div className="text-center mb-7 text-gray-600 text-lg flex flex-row max-[450px]:flex-col justify-center items-center gap-x-2">
            <p>
              {day} คาบที่ {period}
            </p>
            <p>
              ({timeSlots[period].from} - {timeSlots[period].to} น.)
            </p>
          </div>

          <ModeSelection mode={mode} setMode={setMode} />

          <form onSubmit={(e) => handleSubmit(e)} className="w-full">
            {mode === "class" ? (
              <div className="space-y-4  mx-auto block mt-2">
                <OptionInput
                  title="ครูผู้สอน"
                  options={teacherOptions}
                  customStyles={customStyles}
                  setValue={setTeacher}
                  value={teacher}
                />
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
                    value={studentRoom}
                  />
                </div>
              </div>
            ) : (
              <div className=" mx-auto block mt-2">
                <label className="block font-semibold mb-1 text-gray-700">
                  รายละเอียด
                </label>
                <input
                  type="text"
                  className="focus:outline-none focus:border-gray-400 block w-full text-gray-600 border border-gray-300 shadow-md px-3 py-2 rounded-sm"
                  placeholder="ประเภทกิจกรรมที่จะทำ..."
                  value={activityDetail}
                  maxLength={100}
                  onChange={(e) => setActivityDetail(e.target.value)}
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
              className="text-lg text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:outline-none shadow-green-500/50 text-center shadow-sm cursor-pointer py-2 w-full rounded-2xl mx-auto mt-9"
            >
              ยืนยันการจอง
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
export default BookingForm;
