"use client";
import { LucideCalendarClock } from "lucide-react";
import React, { useState } from "react";

function DayPeriodSelector({
  day,
  setDay,
  period,
  setPeriod,
}) {

  const [isOpen, setIsOpen] = useState(false);
  const [tempDay, setTempDay] = useState(day);
  const [tempPeriod, setTempPeriod] = useState(period);
  return (
    <>
      <div className="relative mr-3">
        <button
          onClick={() =>
            setTimeout(() => {
              setTempDay(day);
              setTempPeriod(period);
              setIsOpen(true);
            }, 0)
          }
          className="relative peer p-2.5 rounded-full  hover:bg-gray-100 active:bg-gray-200 transition-colors w-fit h-fit cursor-pointer"
        >
          <LucideCalendarClock className="size-5.5 text-gray-700 opacity-80 peer-hover:opacity-100 transition-opacity" />
        </button>
        {/* Tooltip */}
        <span className="absolute top-full left-1/2 -translate-x-1/2 translate-y-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded-md opacity-0 peer-hover:opacity-100 transition-opacity whitespace-nowrap">
          เลือกเวลา
        </span>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-30 px-2"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-[340px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">เลือกเวลา</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Day Selection */}
            <div className="mb-5">
              <h4 className="text-sm font-semibold text-gray-500 mb-3">วัน</h4>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: "monday", label: "จันทร์" },
                  { key: "tuesday", label: "อังคาร" },
                  { key: "wednesday", label: "พุธ" },
                  { key: "thursday", label: "พฤหัสบดี" },
                  { key: "friday", label: "ศุกร์" },
                ].map((d) => (
                  <button
                    key={d.key}
                    onClick={() => setTempDay(d.key)}
                    className={`px-3 py-2 text-sm rounded-lg font-semibold  transition duration-200 hover:scale-105 active:scale-95 cursor-pointer ${
                      tempDay === d.key
                        ? "bg-red-400 text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Period Selection */}
            <div>
              <h4 className="text-sm font-semibold text-gray-500 mb-3">คาบ</h4>
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setTempPeriod(p)}
                    className={`px-3 py-2 rounded-lg font-semibold transition duration-200 hover:scale-105 active:scale-95 cursor-pointer ${
                      tempPeriod === p
                        ? "bg-red-400 text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full border border-gray-300 rounded-lg py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition hover:scale-105 active:scale-95 cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => {
                  setDay(tempDay);
                  setPeriod(tempPeriod);
                  setIsOpen(false);
                }}
                className="w-full bg-red-400 rounded-lg py-2.5 text-sm font-semibold text-white hover:bg-red-500 active-bg-red-600 transition shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DayPeriodSelector;
