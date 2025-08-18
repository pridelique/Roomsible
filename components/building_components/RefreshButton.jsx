'use client'
import { RefreshCw } from "@node_modules/lucide-react";
import React, { useState, useEffect } from "react";

function timeAgo(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return "เมื่อสักครู่";
    if (diff < 3600) return `${Math.floor(diff / 60)} นาทีที่แล้ว`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} ชั่วโมงที่แล้ว`;
    return date.toLocaleString("th-TH");
}

function RefreshButton({ refresh, setRefresh }) {
    const [latestUpdate, setLatestUpdate] = useState(new Date());
    const [timeText, setTimeText] = useState(timeAgo(latestUpdate));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeText(timeAgo(latestUpdate));
        }, 1000);
        return () => clearInterval(interval);
    }, [latestUpdate]);

    const handleRefresh = () => {
        setRefresh(true);
        const now = new Date();
        setLatestUpdate(now);
        setTimeText(timeAgo(now));
    };

    return (
        <div className="absolute top-0 right-0 p-3 flex justify-center items-center z-10 scale-100 max-[460px]:scale-80 max-[380px]:scale-70 origin-top-right">
            <button
                onClick={handleRefresh}
                className="flex items-center gap-3 bg-white/60 hover:bg-gray-100/60 hover:scale-105 active:bg-gray-200/60 active:scale-95 transition-all duration-150 backdrop-blur-lg rounded-full px-4 py-2 shadow-lg cursor-pointer"
                disabled={refresh}
            >
                <span className="text-xs text-gray-500">
                    {refresh ? "กำลังอัปเดต..." : `อัปเดตล่าสุด: ${timeText}`}
                </span>
                {refresh ? (
                    <div className="w-4 h-4 border-2 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
                ) : (
                    <RefreshCw
                        className={`w-4 h-4 text-gray-500 ${refresh ? "animate-spin" : ""}`}
                    />
                )}
            </button>
        </div>
    );
}

export default RefreshButton;
