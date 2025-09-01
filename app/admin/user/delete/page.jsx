"use client";
import React, { useState } from "react";

function UserDeletePage() {
  const [classroom, setClassroom] = useState("");

  const handleDeleteAllUser = async (e) => {
    e.preventDefault();

    for (let i = 1; i <= 6; i++) {
      for (let j = 1; j <= 14; j++) {
        const classroomTemp = `${i}.${j}`;
        console.log(classroomTemp);

        try {
          const getUserRes = await fetch(
            `/api/users?classroom=${classroomTemp.replace("ม.", "")}`
          );
          const { users } = await getUserRes.json();

          if (getUserRes.ok) {
            console.log(users);
            let totalDeleted = 0;
            for (const user of users) {
              if (await deleteUser(user.user_id)) {
                totalDeleted++;
              }
            }
          } else {
            console.error("Error fetching users: ", getUserRes);
          }
        } catch (error) {
          console.error("Unexpected error occurred: ", error);
        }
      }
    }
    try {
      const getUserRes = await fetch(
        `/api/users?classroom=${classroom.replace("ม.", "")}`
      );
      const { users } = await getUserRes.json();

      if (getUserRes.ok) {
        console.log(users);
        let totalDeleted = 0;
        for (const user of users) {
          if (await deleteUser(user.user_id)) {
            totalDeleted++;
          }
        }
      } else {
        console.error("Error fetching users: ", getUserRes);
      }
    } catch (error) {
      console.error("Unexpected error occurred: ", error);
    }
  };
  const handleDeleteUser = async (e) => {
    e.preventDefault();

    try {
      const getUserRes = await fetch(
        `/api/users?classroom=${classroom.replace("ม.", "")}`
      );
      const { users } = await getUserRes.json();

      if (getUserRes.ok) {
        console.log(users);
        let totalDeleted = 0;
        for (const user of users) {
          if (await deleteUser(user.user_id)) {
            totalDeleted++;
          }
        }
      } else {
        console.error("Error fetching users: ", getUserRes);
      }
    } catch (error) {
      console.error("Unexpected error occurred: ", error);
    }
  };

  const deleteUser = async (user_id) => {
    try {
      const deleteUserRes = await fetch(`/api/users`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ user_id }),
      });

      if (!deleteUserRes.ok) {
        console.error("❌ Error deleting user: ", deleteUserRes);
        return true;
      } else {
        console.log("✅ User deleted successfully: ", user_id);
        return false;
      }
    } catch (error) {
      console.error("Unexpected error occurred: ", error);
      return false;
    }
  };

  return (
    <div className="padding-x">
      <form onSubmit={(e) => handleDeleteUser(e)}>
        <ul className="flex flex-col gap-4 mt-4">
          <li className="flex items-center border-b border-gray-400 pb-2 ">
            <input
              type="text"
              placeholder="ห้องเรียน ม.1.1 / 1.1"
              value={classroom}
              onChange={(e) => setClassroom(e.target.value)}
              className="w-full outline-none placeholder-gray-500 text-gray-700"
              required
            />
          </li>
        </ul>
        <button
          type="submit"
          className="px-4 py-2 bg-red-500 text-white rounded-xl mt-2"
        >
          Delete User
        </button>
      </form>
      <form onSubmit={(e) => handleDeleteAllUser(e)}>
        <button
          type="submit"
          className="px-4 py-2 bg-red-500 text-white rounded-xl mt-2"
        >
          Delete All Users
        </button>
      </form>
    </div>
  );
}

export default UserDeletePage;
