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
  { label: "รอเช็คอิน", value: "pending", color: 'text-yellow-500' },
  { label: "คอมเฟิร์ม", value: "confirmed", color: 'text-green-500' },
  { label: "ถูกยกเลิก", value: "cancelled", color: 'text-red-500' },
  { label: "รวม", value: "all", color: 'text-blue-500' },
];

function DashboardPage() {
  const [bookings, setBookings] = useState([]);

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

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 tracking-tight">
          Roomsible Dashboard
        </h1>
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
                          <span className={`text-2xl font-bold ${status.color}`}>
                            {
                              bookings
                                .filter(
                                  (booking) => day.value === "all" || booking.day === day.value
                                )
                                .filter(
                                  (booking) => type.value === "all" || booking.type === type.value
                                )
                                .filter(
                                  (booking) => status.value === "all" || booking.status === status.value
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