'use client';
import { useEffect, useState } from "react";
function QRCodeMask({ innerHeight }) {
    const [screenWidth, setScreenWidth] = useState("100%");
    useEffect(() => {
        const resize = () => {
            const screenWidth = window.innerWidth;
            setScreenWidth((screenWidth-256)/2);
        }
        resize()
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    })
  return (
    <div className="opacity-40 z-1">
      <div
        className="absolute w-full bg-black "
        style={{ height: innerHeight/2 -128 , top: 0 }}
      ></div>
      <div
        className="absolute w-full bg-black"
        style={{ height: innerHeight/2-128, top: innerHeight/2+128 }}
      ></div>
      <div
        className="absolute h-64 bg-black"
        style={{ width: screenWidth, top: innerHeight/2-128 }}
      ></div>
      <div
        className="absolute h-64 bg-black right-0"
        style={{ width: screenWidth, top: innerHeight/2-128 }}
      ></div>
    </div>
  );
}

export default QRCodeMask;
