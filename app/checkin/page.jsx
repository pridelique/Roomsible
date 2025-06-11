"use client";
import { useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";
import Image from "@node_modules/next/image";
import { check_mark, warning, x_mark } from "@public/assets/icons";
import Link from "@node_modules/next/link";
import { bordersw } from "@public/assets/images";
import QRCodeFrame from "@components/QRFrame";
import QRCodeMask from "@components/QRMask";
import QRCodeErrorMessage from "@components/QRErrorMessage";
import QRSuccessMessage from "@components/QRSuccessMessage";

export default function FullScreenQRScanner() {
  const videoRef = useRef(null);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isStop, setIsStop] = useState(true);
  const [qrcodeTop, setQrcodeTop] = useState(10000);
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
                var random = Math.ceil(Math.random() * 3);
                console.log(random);

                if (random == 1) {
                  setError({
                    type: "incorrect",
                  });
                } else if (random == 2) {
                  setError({
                    type: "no-booking",
                    roomNumber: 1202,
                    time: "08.30 - 09.20 น.",
                  });
                } else {
                  setSuccess({
                    buildingId: 1,
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
      const screenWidth = window.innerWidth;
      // console.log(video.clientWidth, video.clientHeight);
      setQrcodeTop((screenHeight - 76) / 2);
      setElementTop((screenHeight + 76) / 2);
    };
    resize();
    startScaning();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="w-screen h-screen absolute left-0 top-0 overflow-hidden">
      <div className="mt-19"></div>
      <div className="w-full h-full relative left-0 top-0 overflow-hidden p-0 m-0 z-1">
        {/* กล้องเต็มหน้าจอ */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover flex items-start justify-center"
        />
        {/* QR Code Element */}
        <div className={`${isStop && "hidden"}`}>
          <div className="absolute inset-0 flex flex-col items-center opacity-70 text-white h-full justify-between z-3">
            <p className="mt-14 text-2xl md:text-3xl lg:text-4xl font-semibold">
              สแกน QR Code เพื่อเช็คอิน
            </p>
            <p className="mb-24 text-sm md:text-base lg:text-lg">
              วาง QR Code ให้อยู่ในกรอบเพื่อเริ่มเช็คอิน
            </p>
          </div>
          <QRCodeFrame qrcodeTop={qrcodeTop} />
          <QRCodeMask qrcodeTop={qrcodeTop} />
        </div>
      </div>

      {/* Loading... */}
      {loading && (
        <div
          className="absolute left-1/2 -translate-1/2 p-10 rounded-full border-6 border-t-6 border-transparent border-t-red-400 animate-spin z-4"
          style={{ top: elementTop }}
        ></div>
      )}

      {/* Overlay สำหรับแสดงผลลัพธ์ */}
      {result && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-8 py-2 rounded">
          <p>ข้อมูลที่ได้จาก QR Code:</p>
          <p>{result}</p>
        </div>
      )}

      {/* แสดงข้อผิดพลาด */}
      {error && (
        <QRCodeErrorMessage
          error={error}
          elementTop={elementTop}
          startScaning={startScaning}
        />
      )}

      {/* ข้อความสำเร็จ */}
      {success && (
        <QRSuccessMessage success={success} elementTop={elementTop}/>
      )}
    </div>
  );
}
