"use client";
import { useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";
import Image from "@node_modules/next/image";
import { check_mark, warning, x_mark } from "@public/assets/icons";
import Link from "@node_modules/next/link";
import { bordersw } from "@public/assets/images";

export default function FullScreenQRScanner() {
  const videoRef = useRef(null);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isStop, setIsStop] = useState(true);
  const [qrcodeTop, setQrcodeTop] = useState("200%");
  const [elementTop, setElementTop] = useState("50%");
  const startScaning = () => {
    setResult("");
    setError("");
    setSuccess("");
    setIsStop(false);
    const codeReader = new BrowserQRCodeReader();
    if (videoRef.current) {
      codeReader
        .decodeFromVideoDevice(
          null,
          videoRef.current,
          (decodedResult, err, control) => {
            if (decodedResult) {
              setResult(decodedResult.getText());
              setError(""); // Clear errors on successful scan
              control.stop();
              setIsStop(true);
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                var random = Math.ceil(Math.random()*3)
                console.log(random);
                
                if (random == 1) {
                  setError({
                    type : 'incorrect'
                  })
                } else if (random == 2) {
                  setError({
                    type : 'no-booking',
                    roomNumber : 1202,
                    time : '08.30 - 09.20 น.'
                  })
                } else {
                  setSuccess({
                    roomNumber: 1202,
                    time: "08.30 - 09.20 น.",
                  });
                }
                // setError({
                //     type : 'no-booking',
                //     roomNumber : 1202,
                //     time : '08.30 - 09.20 น.'
                //   })
              }, 2000);
            } else if (err) {
              setError(err.message);
            }
          }
        )
        .catch((err) => {
          setError(`Error accessing camera: ${err.message}`);
        });
    }
  };

  useEffect(() => {
    const resize = () => {
      const video = videoRef.current;
      const screenHeight = window.innerHeight;
      // console.log(video.clientWidth, video.clientHeight);
      setQrcodeTop(`${(screenHeight - 76) / 2}px`);
      setElementTop(`${(screenHeight + 76) / 2}px`);
      console.log(window.innerHeight);
    };
    resize();
    startScaning();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="w-screen h-screen absolute left-0 top-0 overflow-hidden">
      <div className="mt-19"></div>
      <div className="w-full h-full relative left-0 top-0 overflow-hidden p-0 m-0 z-8">
        {/* กล้องเต็มหน้าจอ */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover flex items-start justify-center"
        />
        {/* <div className='absolute top-19 w-full h-full bg-green-300'> */}
        <div
          className={`absolute left-1/2 -translate-1/2  p-32 z-10 ${
            isStop && "hidden"
          }`}
          style={{ top: qrcodeTop }}
        >
          {/* top left */}
          <div className="absolute top-0 left-0 size-12 border-t-8 border-l-8 border-red-400 "></div>
          <div className="absolute top-0 right-0 size-12 border-t-8 border-r-8 border-red-400 "></div>
          <div className="absolute bottom-0 left-0 size-12 border-b-8 border-l-8 border-red-400 "></div>
          <div className="absolute bottom-0 right-0 size-12 border-b-8 border-r-8 border-red-400 "></div>
        </div>
        {/* </div> */}
      </div>
      {/* Loading... */}

      {loading && (
        <>
          {/* <div className="absolute bg-black opacity-30 top-0 w-screen h-screen z-[11]"></div> */}
          <div
            className="absolute left-1/2 -translate-1/2 p-10 rounded-full border-6 border-t-6 border-transparent border-t-red-400 animate-spin z-[12]"
            style={{ top: elementTop }}
          ></div>
        </>
      )}

      {/* Overlay สำหรับแสดงผลลัพธ์ */}
      {result && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-8 py-2 rounded">
          <p>ข้อมูลที่ได้จาก QR Code:</p>
          <p>{result}</p>
        </div>
      )}

      {/* แสดงข้อผิดพลาด */}
      {error?.type === "incorrect" && (
        <div
          className="absolute left-1/2 -translate-1/2 bg-white text-white px-8 pt-6 pb-4 rounded-xl z-[12] shadow-lg text-center w-full  max-w-[340px] flex flex-col justify-center items-center"
          style={{ top: elementTop }}
        >
          <div>
            <Image src={warning} alt="warning" width={36} height={36} />
          </div>

          <h3 className="text-xl text-gray-700 mt-2">ขออภัย</h3>
          <p className="leading-5 mt-1 text-slate-gray px-3">
            ข้อมูล QR Code ไม่ถูกต้องกรุณาตรวจสอบและทำรายการใหม่อีกครั้ง
          </p>
          <hr className="w-full border border-gray-300 mt-4" />
          <button
            className="mt-4 text-lg bg-green-500 px-10 py-2 w-4/5 rounded-full"
            onClick={startScaning}
          >
            ตกลง
          </button>
        </div>
      )}

      {error?.type === "no-booking" && (
        <div
          className="absolute left-1/2 -translate-1/2 bg-white text-white px-8 pt-6 pb-4 rounded-xl z-[12] shadow-lg text-center w-full max-w-[340px] flex flex-col justify-center items-center"
          style={{ top: elementTop }}
        >
          <div>
            <Image src={x_mark} alt="x_mark" width={36} height={36} />
          </div>

          <h3 className="text-xl text-gray-700 mt-2">ขออภัย</h3>
          <p className="leading-5 mt-1 text-slate-gray px-3">
            คุณไม่ได้จองห้อง {error?.roomNumber} <br />
            ในเวลา {error?.time} กรุณาตรวจสอบและทำรายการใหม่อีกครั้ง
          </p>
          <hr className="w-full border border-gray-300 mt-4" />
          <button
            className="mt-4 text-lg bg-green-500 px-10 py-2 w-4/5 rounded-full"
            onClick={startScaning}
          >
            ตกลง
          </button>
        </div>
      )}

      {success && (
        <div
          className="absolute left-1/2 -translate-1/2 bg-white text-white pb-4 rounded-xl z-[12] shadow-lg text-center w-full max-w-[340px] flex flex-col justify-center items-center "
          style={{ top: elementTop }}
        >
          <div className="w-full relative">
            <Image src={bordersw} alt="school" width={340} height={340} className="rounded-t-xl"/>
            <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-white rounded-full shadow-lg">
              <Image src={check_mark} alt="check_mark" width={111} height={111} />
            </div>
          </div>

          <div className="px-8 flex flex-col justify-center items-center w-full mt-1">
            <h3 className="text-2xl text-green-500 mt-2">ยืนยันสำเร็จ</h3>
            <p className="leading-5 mt-1 text-slate-gray px-3">
              คุณได้ทำการเช็คอินห้อง {success?.roomNumber} <br />
              ในเวลา {success?.time} เรียบร้อยแล้ว
            </p>
            <hr className="w-full border border-gray-300 mt-4" />
            <Link
              href="/"
              className="mt-4 text-lg bg-green-500 px-10 py-2 w-4/5 rounded-full"
              onClick={startScaning}
            >
              กลับไปหน้าแรก
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
