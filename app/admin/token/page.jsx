"use client";
import { Copy } from "lucide-react";
import React, { useState } from "react";
import { QRCodeSVG } from 'qrcode.react'
function CreateRoomToken() {
  const [room, setRoom] = useState("");
  const [token, setToken] = useState("");
    
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

      const response = await fetch("/api/bookings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: data.token, day: "Monday", period: 1 }),
      });
      const patchData = await response.json();
      console.log("Patch response:", patchData);
      
    } catch (error) {
      console.error("Error generating token:", error);
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
      </form>
      {token && (
        <div className="p-4 flex justify-center items-center">
          <QRCodeSVG value={token} size={200} />
        </div>
      )}
    </section>
  );
}

export default CreateRoomToken;
