"use client";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import {
  useParams,
  useRouter,
  useSearchParams,
} from "@node_modules/next/navigation";
import { timeSlots } from "@data";
import { warning } from "@public/assets/icons";
import Image from "@node_modules/next/image";
import { buildingImages } from "@public/assets/images";
import Arrow_down from "@public/assets/icons/arrow_down.svg";
import "@app/globals.css";
import Link from "@node_modules/next/link";

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
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { id } = useParams();
  const searchParams = useSearchParams();
  const roomNumber = searchParams.get("roomNumber") || "0";
  const period = searchParams.get("period") || "1";
  const day = searchParams.get("day") || "วันจันทร์";
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSubmit = () => {
    if (mode === "class") {
      console.log({ teacher, subject, studentRoom });
    } else {
      console.log({ activityDetail });
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
  const teacherList = ["ครูสมชาย", "ครูสมศรี", "ครูแจ่มใส"];
  const teacherOptions = teacherList.map((name) => ({
    value: name,
    label: name,
  }));
  const subjectOptions = [
    { value: "ฟิสิกส์", label: "ฟิสิกส์" },
    { value: "เคมี", label: "เคมี" },
    { value: "ชีวะ", label: "ชีวะ" },
  ];
  const roomOptions = [
    { value: "ม.1.1", label: "ม.1.1" },
    { value: "ม.1.2", label: "ม.1.2" },
    { value: "ม.1.3", label: "ม.1.3" },
  ];

  const formOptions = [
    { value: "class", label: "การเรียนการสอน" },
    { value: "activity", label: "กิจกรรม" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

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
            <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-white text-white px-8 pt-6 pb-4 rounded-xl z-3 shadow-lg text-center w-full max-w-[340px] flex flex-col justify-center items-center">
              <div>
                <Image src={warning} alt="warning" width={36} height={36} />
              </div>

              <h3 className="text-xl text-gray-700 mt-2">ขออภัย</h3>
              <p className="leading-5 mt-1 text-slate-gray px-3">
                เกิดข้อผิดพลาดในการจองห้องเรียน กรุณาลองใหม่อีกครั้ง
              </p>
              <hr className="w-full border border-gray-300 my-6" />
              <button
                className="text-lg text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none shadow-red-500/50 font-medium text-center shadow-sm cursor-pointer py-2 w-4/5 rounded-2xl"
                onClick={() => {
                  router.push(
                    `/building/${id}/schedule?roomNumber=${roomNumber}`
                  );
                }}
              >
                ย้อนกลับ
              </button>
            </div>
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
                    className="w-[90%] py-2 rounded-full shadow-sm mx-auto block
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
        <div className="bg-white px-10 py-12 rounded-3xl shadow-md w-full max-w-md mx-auto border border-gray-300 flex flex-col items-center">
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

          <div className="flex justify-evenly mb-4 space-x-6  max-[450px]:hidden">
            <span
              className={`cursor-pointer px-3 pb-1 ${
                mode === "class"
                  ? "border-[#466AB0] border-b-2 text-[#466AB0] font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => setMode("class")}
            >
              การเรียนการสอน
            </span>
            <span
              className={`cursor-pointer px-3  pb-1 ${
                mode === "activity"
                  ? "border-[#466AB0] border-b-2 text-[#466AB0] font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => setMode("activity")}
            >
              กิจกรรม
            </span>
          </div>
          <div
            className="p-2.5 text-[#466AB0] w-full rounded-lg shadow-md  gap-2 relative mx-auto mb-6 cursor-pointer hidden max-[450px]:flex justify-between items-center outline-1 outline-[#cccccc] focus:outline-2 transition-all duration-100 group"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            tabIndex={0}
          >
            <p className="font-semibold text-center w-full text-slate-gray">
              {mode === "class" ? "การเรียนการสอน" : "กิจกรรม"}
            </p>
            <div className="absolute right-3 flex items-center justify-center">
              <Arrow_down className="text-gray-300 w-5 h-5 group-focus:text-gray-400 transition-all duration-100 hover:text-gray-400" />
            </div>
            {dropdownOpen && (
              <div
                className="absolute w-full border top-14 rounded-sm border-[#cccccc] left-1/2 -translate-x-1/2 text-slate-gray z-2 bg-white shadow-md overflow-hidden"
                ref={dropdownRef}
              >
                <ul>
                  <li
                    className={`py-2 px-4 hover:bg-gray-100 cursor-pointer ${
                      mode === "class" && "font-semibold"
                    }`}
                    onClick={() => {
                      setMode("class");
                      setDropdownOpen(false);
                    }}
                  >
                    <p>การเรียนการสอน</p>
                  </li>
                  <li
                    className={`py-2 px-4 hover:bg-gray-100 cursor-pointer ${
                      mode === "activity" && "font-semibold"
                    }`}
                    onClick={() => {
                      setMode("activity");
                      setDropdownOpen(false);
                    }}
                  >
                    <p>กิจกรรม</p>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {mode === "class" ? (
            <div className="space-y-4 w-[90%] mx-auto block mt-2">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  ครูผู้สอน
                </label>
                <Select
                  className="react-select-container shadow-md"
                  classNamePrefix="react-select"
                  styles={customStyles}
                  options={teacherOptions}
                  value={teacherOptions.find(
                    (option) => option.value === teacher
                  )}
                  onChange={(selected) => setTeacher(selected?.value || "")}
                  placeholder="เลือก"
                ></Select>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div>
                  <label className="block font-semibold mb-1 text-gray-700">
                    รายวิชา
                  </label>
                  <Select
                    className="shadow-md"
                    styles={customStyles}
                    isSearchable={false}
                    options={subjectOptions}
                    value={subjectOptions.find(
                      (option) => option.value === subject
                    )}
                    onChange={(selected) => setSubject(selected?.value || "")}
                    placeholder="เลือก"
                    classNamePrefix="react-select"
                  ></Select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-gray-700">
                    ห้องที่สอน
                  </label>
                  <Select
                    className="shadow-md"
                    styles={customStyles}
                    isSearchable={false}
                    options={roomOptions}
                    value={roomOptions.find(
                      (option) => option.value === studentRoom
                    )}
                    onChange={(selected) =>
                      setStudentRoom(selected?.value || "")
                    }
                    placeholder="เลือก"
                    classNamePrefix="react-select"
                  ></Select>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-[90%] mx-auto block mt-2">
              <label className="block font-semibold mb-1 text-gray-700">
                รายละเอียด
              </label>
              <input
                type="text"
                className="focus:outline-none focus:border-gray-400 block w-full text-gray-600 border border-gray-300 shadow-md px-3 py-2 rounded-sm"
                placeholder="ประเภทกิจกรรมที่จะทำ..."
                value={activityDetail}
                onChange={(e) => setActivityDetail(e.target.value)}
              />
            </div>
          )}

          <button
            className="text-lg text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:outline-none shadow-green-500/50 text-center shadow-sm cursor-pointer py-2 w-[90%] rounded-2xl mx-auto mt-9"
            onClick={() => handleSubmit()}
          >
            ยืนยันการจอง
          </button>
        </div>
      )}
    </section>
  );
}
export default BookingForm;
