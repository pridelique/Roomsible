"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";
import QRCodeFrame from "@components/qrCode_components/QRFrame";
import QRCodeErrorMessage from "@components/qrCode_components/QRErrorMessage";
import { SessionContext } from "@provider/SessionProvider";
import ErrorBox from "@components/ErrorBox";
import { Warning } from "@public/assets/icons";
import { useRouter } from "@node_modules/next/navigation";
import Loading from "@components/Loading";
import { getCurrentDay, getCurrentPeriod } from "@utils/currentDayPeriod";
import SuccessCard from "@components/SuccessCard";

export default function FullScreenQRScanner() {
  const videoRef = useRef(null);
  const innerRef = useRef(null);
  const isScanning = useRef(false);
  const [innerHeight, setInnerHeight] = useState(0);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isStop, setIsStop] = useState(true);
  const controlRef = useRef(null);
  const { user } = useContext(SessionContext);
  const router = useRouter();

  const handleCheckin = async (token) => {
    setLoading(true);
    const currentDay = getCurrentDay('eng');
    const currentPeriod = getCurrentPeriod();
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          day: currentDay,
          period: currentPeriod,
        }),
      });
      const data = await res.json();
      // console.log(data);
      if (res.ok || data.message === "Booking already confirmed") {
        setSuccess({
          buildingId: Number(data?.building),
          room: data?.room,
          day: currentDay,
          period: currentPeriod,
        });
      } else if (data.message === "Invalid token") {
        setError({ type: "incorrect" });
      } else if (data.message === "No booking found") {
        setError({
          type: "no-booking",
          room: data?.room,
          day: currentDay,
          period: currentPeriod,
        });
      } else {
        setError({
          type: "unexpected",
        });
      }
    } catch (error) {
      console.error("Error during check-in:", error);
      setError({
        type: "unexpected",
      });
    }
    setLoading(false);
  };

  const startScaning = async () => {
    if (isScanning.current) return;
    isScanning.current = true; // Set scanning state to true
    if (controlRef.current) {
      controlRef.current.stop(); // 🛑 หยุดกล้องเก่าก่อน
    }
    setIsStop(false);
    setResult("");
    setError("");
    setSuccess("");
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
              isScanning.current = false; // Reset scanning state
              setIsStop(true);
              handleCheckin(decodedResult.getText());
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
    setTimeout(() => {
      if (isScanning.current) return; // Prevent multiple scans
      startScaning();
      console.log("Starting QR code scanning...");
    }, 200);
    return () => {
      if (controlRef.current) {
        controlRef.current?.stop(); // Stop the camera when component unmounts
      }
      isScanning.current = false; // Reset scanning state
    }
    

    // setSuccess({
    //   room: "1212",
    //   day: "wednesday",
    //   period: "5",
    //   buildingId: "1",
    // });
    // setError({
    //   type: "no-booking",
    //   room: 1233,
    //   day: 1,
    //   period: 3,
    // })
  }, []);

  useEffect(() => {
    const resize = () => {
      setInnerHeight(window.innerHeight);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  if (user === "loading") return <Loading />;

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
      {success ? (
        <section className="flex max-container w-full pt-4 max-[460px]:pt-0 flex-1 max-[380px]:bg-white">
          <SuccessCard {...success} type="checkin" />
        </section>
      ) : (
        <div
          className="w-full h-full relative p-0 m-0 z-1"
          ref={innerRef}
          style={{ height: innerHeight - 74.4 }}
        >
          {/* กล้องเต็มหน้าจอ */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover flex items-start justify-center"
            muted
            autoPlay
            playsInline
          />
          {/* QR Code Element */}
          <div className={`${isStop && "hidden"}`}>
            <div className="absolute inset-0 flex flex-col items-center opacity-70 text-white h-full justify-between z-3">
              <p className="absolute top-11 text-2xl md:text-3xl lg:text-4xl font-semibold">
                สแกน QR Code เพื่อเช็คอิน
              </p>
              <p className="absolute bottom-5 text-sm md:text-base lg:text-lg">
                วาง QR Code ให้อยู่ในกรอบเพื่อเริ่มเช็คอิน
              </p>
            </div>

            <QRCodeFrame />
          </div>
        </div>
      )}
    </>
  );
}
