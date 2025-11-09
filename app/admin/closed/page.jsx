"use client";
import { supabase } from "@utils/supabase";
import React, { useEffect, useState } from "react";

function SetClosedDatePage() {
  const [closedDates, setClosedDates] = useState(null);
  const [closedFrom, setClosedFrom] = useState("");
  const [openAt, setOpenAt] = useState("");
  const [success, setSuccess] = useState(null);

  const getClosedDates = async () => {
    const { data, error } = await supabase
      .from("closed_schedules")
      .select("id, closed_from, open_at")
      .order("closed_from", { ascending: true });
    if (error) {
      console.error(error);
      return;
    }
    console.log(data);

    setClosedDates(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!closedFrom || !openAt) {
      return;
    }

    const res = await fetch("/api/closed_schedules", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ closedFrom, openAt }),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess("✅ ตั้งวันปิดบริการเรียบร้อยแล้ว");
      getClosedDates();
      setClosedFrom("");
      setOpenAt("");
    }
    console.log(data);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/closed_schedules`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (res.ok) {
      setClosedDates(closedDates.filter((date) => date.id !== id));
      getClosedDates();
    }
    console.log(data);
  };

  useEffect(() => {
    if (closedDates) return;

    getClosedDates();
  }, []);

  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
        <h1 className="text-2xl font-bold">ตั้งวันปิดบริการ</h1>
        <div className="flex gap-2">
          <p>ปิดบริการตั้งแต่</p>
          <input
            type="datetime-local"
            value={closedFrom}
            onChange={(e) => setClosedFrom(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <p>เปิดบริการอีกครั้งใน</p>
          <input
            type="datetime-local"
            value={openAt}
            onChange={(e) => setOpenAt(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md mt-3 cursor-pointer"
        >
          บันทึก
        </button>
      </form>
      {success && <p className="text-green-600 mt-3">{success}</p>}
      <div>
        <h2 className="text-xl font-bold mt-6 mb-3">วันปิดบริการที่ตั้งไว้</h2>
        <table>
          <thead>
            <tr>
              <th className="text-center pr-4">ปิดบริการตั้งแต่</th>
              <th className="text-center">เปิดบริการอีกครั้งใน</th>
              <th className="text-center"></th>
            </tr>
          </thead>
          <tbody>
            {closedDates &&
              closedDates.map((date, index) => (
                <tr key={index}>
                  <td className="px-4 py-1">
                    {new Date(date.closed_from).toLocaleString("th-TH")}
                  </td>
                  <td className="px-4 py-1">
                    {new Date(date.open_at).toLocaleString("th-TH")}
                  </td>
                  <td className="px-4 py-1">
                    <button
                      className="text-red-500 underline cursor-pointer"
                      onClick={() => handleDelete(date.id)}
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SetClosedDatePage;
