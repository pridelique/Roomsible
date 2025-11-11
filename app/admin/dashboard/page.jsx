"use client";

import BookingTierList from "@components/dashboard_components/BookingTierList";
import UserTierList from "@components/dashboard_components/UserTierList";
import { supabase } from "@utils/supabase";
import { useEffect, useState } from "react";

const days = [
  { label: "ทั้งหมด", value: "all" },
  { label: "วันจันทร์", value: "monday" },
  { label: "วันอังคาร", value: "tuesday" },
  { label: "วันพุธ", value: "wednesday" },
  { label: "วันพฤหัสบดี", value: "thursday" },
  { label: "วันศุกร์", value: "friday" },
];

const types = [
  { label: "ทั้งหมด", value: "all" },
  { label: "การเรียนการสอน", value: "class" },
  { label: "กิจกรรม", value: "activity" },
];

const statuses = [
  { label: "รอเช็คอิน", value: "pending", color: "text-yellow-500" },
  { label: "คอมเฟิร์ม", value: "confirmed", color: "text-green-500" },
  { label: "ถูกยกเลิก", value: "cancelled", color: "text-red-500" },
  { label: "รวม", value: "all", color: "text-blue-500" },
];

function DashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  useEffect(() => {
    if (bookings.length !== 0) return;
    const getAllBookings = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("booking_id, room, day, type, status, user_id");

      if (error) {
        console.error("Error fetching bookings:", error);
        return;
      }
      setBookings(data);
    };

    getAllBookings();
  }, []);

  const handleRefreshSheets = async () => {
    setIsRefresh(true);
    const res = await fetch('/api/dashboard', {
      method: "PATCH"
    }) 
    const data = await res.json();
    console.log(data);
    setIsRefresh(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 tracking-tight">
            Roomsible Dashboard
          </h1>
          <div className="flex gap-4 items-center">
            <a href="https://docs.google.com/spreadsheets/d/1a91meja_5LrcfcGxtj2FKvmAe1dfcm6eCaJ5bqbRHxM/edit?gid=0#gid=0" target="_blank" className="underline text-blue-500 hover:text-blue-600 cursor-pointer">google sheets</a>
            <button disabled={isRefresh} onClick={handleRefreshSheets} className="bg-gray-200 shadow-md rounded-lg w-60 px-4 py-2 cursor-pointer hover:bg-gray-300">{isRefresh ?'refreshing...' : 'refresh google sheets'}</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {days.map((day) => (
            <div
              key={day.value}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-gray-100"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {day.label}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {types.map((type) => (
                  <div
                    key={type.value}
                    className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2 border border-gray-100"
                  >
                    <h3 className="text-lg font-medium text-gray-600 mb-2">
                      {type.label}
                    </h3>
                    <div className="flex gap-4 flex-wrap">
                      {statuses.map((status) => (
                        <div
                          key={status.value}
                          className="flex flex-col items-center justify-center bg-white rounded-lg shadow p-3 border border-gray-100 whitespace-nowrap flex-1 w-full"
                        >
                          <span className="text-sm text-gray-500 mb-1">
                            {status.label}
                          </span>
                          <span
                            className={`text-2xl font-bold ${status.color}`}
                          >
                            {
                              bookings
                                .filter(
                                  (booking) =>
                                    day.value === "all" ||
                                    booking.day === day.value
                                )
                                .filter(
                                  (booking) =>
                                    type.value === "all" ||
                                    booking.type === type.value
                                )
                                .filter(
                                  (booking) =>
                                    status.value === "all" ||
                                    booking.status === status.value
                                ).length
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <BookingTierList bookings={bookings} />
        </div>
        <div>
          <UserTierList bookings={bookings} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
