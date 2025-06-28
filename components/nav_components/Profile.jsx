"use client";

import { Guest_Profile } from "@public/assets/images";
import { useEffect, useRef, useState } from "react";

function Profile({ handleLogout }) {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdown(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  },[])
  return (
    <div className="relative">
      <button
        className="flex items-center justify-center cursor-pointer opacity-50 hover:opacity-80 focus:opacity-80  transition-all duration-200"
        onClick={() => setTimeout(() => setProfileDropdown(!profileDropdown), 0)}
      >
        <Guest_Profile className="size-10 text-slate-gray opacity-50" />
      </button>
      {profileDropdown && (
        <div className="absolute w-40 right-0 top-full bg-white shadow-md rounded-lg z-10 text-sm overflow-hidden border border-gray-300 text-slate-gray" ref={dropdownRef}>
          <ul>
            <li className="hover:bg-gray-100">
              <button className="w-full px-4 py-2 cursor-pointer" onClick={handleLogout}>
                ออกจากระบบ
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Profile;
