"use client";
import { Copy } from "lucide-react";
import React, { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { bookableRoom } from "@data";
function CreateRoomToken() {
  const [room, setRoom] = useState("");
  const [token, setToken] = useState("");

  const qrRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ room }),
      });
      if (!res.ok) {
        throw new Error("Failed to generate token");
      }
      const data = await res.json();
      setToken(data.token);
    } catch (error) {
      console.error("Error generating token:", error);
    }
  };

  const handleDownloadQRCodePng = (roomName) => {
    const svgElement = qrRef.current;
    if (!svgElement) return;

    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgElement);

    // ลบ fill สีขาวจาก <rect> หรือ svg ทั้งหมด
    svgString = svgString
      .replace(/<rect[^>]*fill="white"[^>]*>/gi, "") // ลบ rect ที่ fill="white"
      .replace(/fill="white"/gi, "") // ลบ fill="white" ที่เหลือ
      .replace(/style="[^"]*background[^"]*"/gi, ""); // ลบ style background

    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
      const size = 1024;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");
      // ไม่ต้องเติมพื้นหลัง
      ctx.drawImage(image, 0, 0, size, size);

      const pngUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `${roomName || room || "qr"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    };

    image.onerror = (e) => {
      console.error("Error loading SVG image", e);
    };

    image.src = url;
  };

  const handleDownloadQRCodeSvg = (roomName) => {
    const svg = qrRef.current;
    if (!svg) return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);

    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${roomName || room || 'qr'}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAllRooms = async (format) => {
    for (const room of bookableRoom) {
      setRoom(room);
      try {
        const res = await fetch("/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ room }),
        });
        if (!res.ok) {
          throw new Error("Failed to generate token");
        }
        const data = await res.json();
        setToken(data.token);
      } catch (error) {
        console.error("Error generating token:", error);
      }
      await new Promise((resolve) => setTimeout(resolve, 300)); // 300ms พักรอการ render

      if (format === "png") {
        handleDownloadQRCodePng(room);
      } else if (format === "svg") {
        handleDownloadQRCodeSvg(room);
      }
    }
  };

  return (
    <section className="padding-x max-container w-full pt-6">
      <form
        className="bg-white p-6 max-w-xl mx-auto rounded-lg shadow-md"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-center text-3xl font-semibold">Genarate Token</h1>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Room:</h2>
          <input
            className="bg-gray-100 p-2 rounded-md w-full"
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Generated Token:</h2>
          <div className="bg-gray-100 p-2 rounded-md overflow-hidden flex relative pr-4">
            <p className="whitespace-nowrap mr-6 overflow-hidden w-full">
              {token}
            </p>
            {token && (
              <span
                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer "
                onClick={() => navigator.clipboard.writeText(token)}
              >
                <Copy />
              </span>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-green-500 px-4 py-2 rounded-lg text-white cursor-pointer w-full"
        >
          Genarate Token
        </button>
        <div className="w-full mt-2 flex justify-between items-center gap-2">
          <button className="bg-green-500 px-4 py-2 rounded-lg text-white cursor-pointer w-full"
            onClick={() => handleDownloadAllRooms("png")}
          >
            Download all rooms as .png
          </button>
          <button className="bg-green-500 px-4 py-2 rounded-lg text-white cursor-pointer w-full"
            onClick={() => handleDownloadAllRooms("svg")}
          >
            Download all rooms as .svg
          </button>
        </div>
      </form>
      {token && (
        <div className="p-4 flex justify-center items-center flex-col gap-2">
          <QRCodeSVG ref={qrRef} value={token} size={200} />
          <div className="flex gap-2 mt-4">
            <button
              className="py-2 px-4 bg-green-400 shadow-lg rounded-lg text-white cursor-pointer"
              onClick={handleDownloadQRCodePng}
            >
              Download .png
            </button>
            <button
              className="py-2 px-4 bg-green-400 shadow-lg rounded-lg text-white cursor-pointer"
              onClick={handleDownloadQRCodeSvg}
            >
              Download .svg
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default CreateRoomToken;
