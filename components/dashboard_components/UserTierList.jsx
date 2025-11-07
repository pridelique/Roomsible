import React from "react";

function UserTierList({ bookings }) {
  // นับจำนวนการจองแต่ละ user
  const userCount = {};
  bookings.forEach((b) => {
    if (!userCount[b.user_id]) userCount[b.user_id] = 0;
    userCount[b.user_id]++;
  });

  // แปลงเป็น array และเรียงลำดับ
  const tierList = Object.entries(userCount)
    .sort((a, b) => b[1] - a[1])
    .map(([user, count], idx) => ({ user, count, tier: idx + 1 }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-gray-100 mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          User Booking Tier List
        </h2>
        <div className="space-y-3 max-h-[500px] overflow-y-auto p-2">
          {tierList.map(({ user, count, tier }) => (
            <div
              key={user}
              className={`flex items-center gap-4 p-4 rounded-xl shadow border border-gray-100 bg-white h-fit ${
                tier === 1
                  ? "ring-2 ring-yellow-400"
                  : tier === 2
                  ? "ring-2 ring-gray-400"
                  : tier === 3
                  ? "ring-2 ring-orange-400"
                  : ""
              }`}
            >
              <span className="text-xl font-bold text-gray-700 whitespace-nowrap">
                {user}
              </span>
              <span className="ml-auto text-lg font-semibold text-blue-600 whitespace-nowrap">
                {count} bookings
              </span>
              <span className="ml-4 px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-sm whitespace-nowrap">
                Tier {tier}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserTierList;