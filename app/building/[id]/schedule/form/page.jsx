"use client";
import { useState } from "react";
import Select from "react-select";
import "@app/globals.css";
import {
  useParams,
  useRouter,
  useSearchParams,
} from "@node_modules/next/navigation";
import { timeSlots } from "@data";
import { warning } from "@public/assets/icons";
import Image from "@node_modules/next/image";
import { buildingImages } from "@public/assets/images";
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

  return (
    <>
      {isSubmiting ? (
        <>
          {loading && (
            <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
              <div className="border-3 border-gray-100 border-t-3 border-t-red-400 rounded-full p-6 animate-spin shadow-inner"></div>
            </div>
          )}

          <div className="absolute top-0 left-0 flex justify-center items-center h-screen w-screen">
            {error && (
              <div className=" bg-white text-white px-8 pt-6 pb-4 rounded-xl z-3 shadow-lg text-center w-full  max-w-[340px] flex flex-col justify-center items-center">
                <div>
                  <Image src={warning} alt="warning" width={36} height={36} />
                </div>

                <h3 className="text-xl text-gray-700 mt-2">ขออภัย</h3>
                <p className="leading-5 mt-1 text-slate-gray px-3">
                  เกิดข้อผิดพลาดในการจองห้องเรียน กรุณาลองใหม่อีกครั้ง
                </p>
                <hr className="w-full border border-gray-300 my-6" />
                <button
                  className="text-lg text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:outline-none shadow-green-500/50 font-medium text-center shadow-sm cursor-pointer py-2 w-4/5 rounded-2xl"
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
              <div className="items-center justify-center text-center">
                <div className="bg-white rounded-3xl shadow-md w-full max-w-md mx-auto border border-gray-300 mt-25 mb-7">
                  <Image
                    src={buildingImages[id]}
                    alt="Building"
                    width={400}
                    height={200}
                    className="rounded-t-3xl mb-2"
                  />
                  <div className="p-4">
                    <div className="text-2xl font-semibold mb-4 text-green-600">
                      การจองสำเร็จ
                    </div>
                    <p className="text-gray-600 mt-2">
                      จองห้อง {roomNumber} {day} คาบที่ {period}  เรียบร้อยแล้ว
                    </p>
                    <button
                      onClick={() => router.push("/")}
                      className='mb-15 mt-10 w-[90%] py-2 rounded-full shadow-md mx-auto block border border-gray-300 bg-white text-gray-600
                       hover:bg-gradient-to-r from-green-300 to-green-600 hover:text-white cursor-pointer'
                    >
                      กลับหน้าแรก
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="bg-white p-15 rounded-3xl shadow-md w-full max-w-md mx-auto border border-gray-300">
          <h2 className="text-3xl font-semibold text-center mb-2 text-gray-700">
            ห้อง {roomNumber}
          </h2>
          <p className="text-center mb-7 text-gray-600 text-lg">
            คาบที่ {period} ({timeSlots[period].from} - {timeSlots[period].to}{" "}
            น.)
          </p>

          <div className="flex justify-center mb-4 text-lg space-x-6">
            <span
              className={`cursor-pointer px-4 pb-1 ${
                mode === "class"
                  ? "border-[#466AB0] border-b-2 text-[#466AB0] font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => setMode("class")}
            >
              การเรียนการสอน
            </span>
            <span
              className={`cursor-pointer px-7 pb-1 ${
                mode === "activity"
                  ? "border-[#466AB0] border-b-2 text-[#466AB0] font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => setMode("activity")}
            >
              กิจกรรม
            </span>
          </div>

          {mode === "class" ? (
            <div className="space-y-4 w-[90%] mx-auto block">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">
                  ครูผู้สอน
                </label>
                <Select
                  className="react-select-container shadow-md"
                  classNamePrefix="react-select"
                  options={teacherOptions}
                  value={teacherOptions.find(
                    (option) => option.value === teacher
                  )}
                  onChange={(selected) => setTeacher(selected?.value || "")}
                  placeholder="เลือก"
                ></Select>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block font-semibold mb-1 text-gray-700">
                    รายวิชา
                  </label>
                  <Select
                    className="shadow-md"
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
                <div className="w-1/2">
                  <label className="block font-semibold mb-1 text-gray-700">
                    ห้องที่สอน
                  </label>
                  <Select
                    className="shadow-md"
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
            <div className="w-[90%] mx-auto block">
              <label className="block font-semibold mb-1 text-gray-700">
                รายละเอียด
              </label>
              <input
                type="text"
                className="focus:outline-none focus:border-gray-400 block w-full text-gray-600 border border-gray-300 shadow-md px-3 py-2 rounded-xl"
                placeholder="ประเภทกิจกรรมที่จะทำ..."
                value={activityDetail}
                onChange={(e) => setActivityDetail(e.target.value)}
              />
            </div>
          )}

          <button
            className="mt-10 w-[90%] py-2 rounded-full hover:bg-gradient-to-r from-red-300 to-red-600 shadow-md mx-auto block hover:text-white border border-gray-300 cursor-pointer bg-white text-gray-600 "
            onClick={handleSubmit}
          >
            ยืนยันการจอง
          </button>
        </div>
      )}
    </>
  );
}
export default BookingForm;
