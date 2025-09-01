'use client'
import React, { useState } from 'react'

function UserDeletePage() {
    const [classroom, setClassroom] = useState("");

    const handleDeleteUser = async (e) => {
      e.preventDefault();

      try {
        const getUserRes = await fetch(`/api/users?classroom=${classroom.replace('ม.', '')}`);
        const { users } = await getUserRes.json();
  
        if (getUserRes.ok) {
          console.log(users);
          
          for (const user of users) {
            const deleteUserRes = await fetch(`/api/users`, {
              method: 'DELETE',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify({ user_id: user.user_id })
            });

            if (!deleteUserRes.ok) {
              console.error('❌ Error deleting user: ', deleteUserRes);
            } else {
              console.log('✅ User deleted successfully: ', user.user_id);
            }
          }
          console.log(`✅ All users deleted successfully: ${users.length}`);

        } else {
          console.error('Error fetching users: ', getUserRes);
        }
      } catch (error) {
        console.error('Error fetching users: ', error);
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
    </div>
  )
}

export default UserDeletePage