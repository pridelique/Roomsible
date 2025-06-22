"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";
import QRCodeFrame from "@components/QRFrame";
import QRCodeMask from "@components/QRMask";
import QRCodeErrorMessage from "@components/QRErrorMessage";
import QRSuccessMessage from "@components/QRSuccessMessage";
import { SessionContext } from "@provider/SessionProvider";
import ErrorBox from "@components/ErrorBox";
import { Warning, warning } from "@public/assets/icons";
import { useRouter } from "@node_modules/next/navigation";

export default function FullScreenQRScanner() {
  const videoRef = useRef(null);
  const innerRef = useRef(null);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isStop, setIsStop] = useState(true);
  const [innerHeight, setInnerHeight] = useState(0);
  const controlRef = useRef(null);
  const { user } = useContext(SessionContext);
  const router = useRouter();
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
            controlRef.current = control;

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
          setError({
            type: `Error accessing camera`,
          });
        });
    }
  };

  useEffect(() => {
    const resize = () => {
      const video = videoRef.current;
      if (innerRef.current) {
        setInnerHeight(innerRef.current.clientHeight);
      }
    };
    setTimeout(() => {
      resize();
    }, 100);
    startScaning();
    window.addEventListener("resize", resize);
    return () => {      
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (!user)
    return (
      <ErrorBox
        Svg={Warning}
        alt="warning"
        header="ไม่สามารถใช้งานได้"
        message="กรุณาเข้าสู่ระบบเพื่อเข้าใช้งานฟังก์ชันเช็คอิน"
        buttonText="เข้าสู่ระบบ"
        handleOnclick={() => router.push("/login")}
        color="red"
      />
    );

  return (
    <>
      <div className="w-full h-full absolute p-0 m-0 z-1" ref={innerRef}>
        {/* กล้องเต็มหน้าจอ */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover flex items-start justify-center"
        />
        {/* QR Code Element */}
        <div className={`${isStop && "hidden"}`}>
          <div className="absolute inset-0 flex flex-col items-center opacity-70 text-white h-full justify-between z-3">
            <p className="mt-11 text-2xl md:text-3xl lg:text-4xl font-semibold">
              สแกน QR Code เพื่อเช็คอิน
            </p>
            <p className="absolute top-1/2 -translate-y-1/2 mt-44 text-sm md:text-base lg:text-lg">
              วาง QR Code ให้อยู่ในกรอบเพื่อเริ่มเช็คอิน
            </p>
          </div>
          <QRCodeFrame />
          <QRCodeMask innerHeight={innerHeight} />
        </div>
      </div>
      {/* Loading... */}
      {loading && (
        <div className="absolute top-1/2 left-1/2 -translate-1/2 p-10 rounded-full border-6 border-t-6 border-transparent border-t-red-400 animate-spin z-4"></div>
      )}
      {/* Overlay สำหรับแสดงผลลัพธ์ */}
      {/* {result && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-8 py-2 rounded">
          <p>ข้อมูลที่ได้จาก QR Code:</p>
          <p>{result}</p>
        </div>
      )} */}
      {/* แสดงข้อผิดพลาด */}
      {error && (
        <QRCodeErrorMessage error={error} startScaning={startScaning} />
      )}
      {/* ข้อความสำเร็จ */}
      {success && <QRSuccessMessage success={success} />}
    </>
  );
}
