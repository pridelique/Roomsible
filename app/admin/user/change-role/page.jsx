"use client";
import { createClient } from "@supabase/supabase-js";
import { SessionContext } from "@provider/SessionProvider";
import React, { useContext, useState } from "react";

const prefixs = [
  'เด็กหญิง', 'นางสาว'
]

function ChangeRolePage() {
  const [nameClass, setNameClass] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const { user } = useContext(SessionContext);

  const handleSubmitNameClassroom = async (e) => {
    e.preventDefault();

    const lines = nameClass
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    for (const line of lines) {
      let cleaned = line;
      prefixs.forEach((prefix) => {
        cleaned = cleaned.replace(prefix, "").trim();
      })
      const firstname = String(cleaned.split(" ")[0]);
      const lastname = String(cleaned.split(" ")[1]);
      const classroom = String(cleaned.split(" ")[2].replace("ม.", ""));
      // console.log(firstname, lastname, classroom, role);

      const res = await fetch("/api/users/change-role", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          classroom,
          role,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
      } else {
        console.error("Error changing role:", data);
      }
    }
  };

  const handleSubmitUserId = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/users/change-role", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        role,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      console.log(data);
    } else {
      console.error("Error changing role:", data.error);
    }
  };

  return (
    <div className="padding-x">
      <p>input format : ชื่อจริง นามสกุล ห้อง เช่น พัชรภณ กีรติไกรกุล ม.0.0</p>
      <form onSubmit={(e) => handleSubmitNameClassroom(e)}>
        <ul className="flex flex-col gap-4 mt-4">
          <li className="flex items-center border-b border-gray-400 pb-2 ">
            <textarea
              type="text"
              placeholder="พัชรภณ กีรติไกรกุล ม.0.0"
              value={nameClass}
              onChange={(e) => setNameClass(e.target.value)}
              className="w-full outline-none placeholder-gray-500 text-gray-700"
              required
            />
          </li>
          <li className="flex items-center border-b border-gray-400 pb-2 ">
            <input
              type="text"
              placeholder="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full outline-none placeholder-gray-500 text-gray-700"
              required
            />
          </li>
        </ul>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-xl mt-2"
        >
          Change Role By Name Classroom
        </button>
      </form>
      <form onSubmit={(e) => handleSubmitUserId(e)}>
        <ul className="flex flex-col gap-4 mt-10">
          <li className="flex items-center border-b border-gray-400 pb-2 ">
            <textarea
              type="text"
              placeholder="User Id"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full outline-none placeholder-gray-500 text-gray-700"
              required
            />
          </li>
          <li className="flex items-center border-b border-gray-400 pb-2 ">
            <input
              type="text"
              placeholder="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full outline-none placeholder-gray-500 text-gray-700"
              required
            />
          </li>
        </ul>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-xl mt-2"
        >
          Change Role By User Id
        </button>
      </form>
    </div>
  );
}

export default ChangeRolePage;
