"use client";
import { navBuildings, navLink } from "@data";
import Image from "@node_modules/next/image";
import Link from "@node_modules/next/link";
import NavButton from "./NavButton";
import { useState } from "react";
import { arrow_down, arrow_down_selected } from "@public/assets/icons";

function Menu({ setIsShow, session, handleLogout, handleLogin, checkPath, pathname }) {
  const [menuDropdown, setMenuDropdown] = useState(false);
    
  return (
    <div className="flex md:hidden w-full bg-white shadow-md relative z-9 text-base flex-col">
      {/* Link */}
      <ul className="w-full">
        {navLink
          .filter((item) => session || !item.session)
          .map((item) => {
            if (item.label !== "ตึก")
              return (
                <li key={item.label}>
                  <Link
                    href={item.path}
                    className={`block px-6 py-3.5 ${
                      checkPath(item) ? "text-red-400" : "text-slate-gray"
                    } hover:bg-gray-100 w-full`}
                    onClick={() => setIsShow(false)}
                  >
                    <div className="flex item-center gap-3">
                      <div className="flex items-center justify-center">
                        <Image
                          src={checkPath(item) ? item.selectedIcon : item.icon}
                          alt={item.label}
                          width={20}
                          height={30}
                        />
                      </div>
                      <p className="font-[550]">{item.label}</p>
                    </div>
                  </Link>
                </li>
              );
            return (
              <li key={item.label} className="relative">
                <button
                  className={`flex justify-between px-6 py-3.5 ${
                    checkPath(item) ? "text-red-400" : "text-slate-gray"
                  } hover:bg-gray-100 w-full`}
                  onClick={() => setMenuDropdown(!menuDropdown)}
                >
                  <div className="flex item-center gap-3">
                    <div className="flex items-center justify-center">
                      <Image
                        src={checkPath(item) ? item.selectedIcon : item.icon}
                        alt={item.label}
                        width={20}
                        height={30}
                      />
                    </div>
                    <p className="font-[550]">{item.label}</p>
                  </div>
                  <div className="flex items-center justify-center relative top-[1.5px]">
                    <Image
                      src={checkPath(item) ? arrow_down_selected : arrow_down}
                      alt="arrow_down"
                      width={20}
                      height={20}
                      className={`${
                        menuDropdown ? "rotate-180" : ""
                      } duration-100`}
                    />
                  </div>
                </button>
                {menuDropdown && (
                  <div className=" bg-white w-full">
                    <ul>
                      {navBuildings.map((item) => (
                        <li key={item.id} className="group">
                          <Link
                            href={`/building/${item.id}`}
                            className="w-full text-start flex px-10 py-3.5 hover:bg-gray-100 relative"
                            onClick={() => setIsShow(false)}
                          >
                            <span className={`h-full top-0 absolute border  ${checkPath(item) ? 'border-red-300 group-hover:border-red-400' : 'border-gray-300 group-hover:border-slate-gray'} group-first:rounded-t-lg group-first:h-3/4 group-first:top-[25%] group-last:rounded-b-lg group-last:h-3/4 group-last:bottom-[25%] `}></span>
                            <p className={`px-4 ${checkPath(item) ? 'text-red-400' : 'text-slate-gray'}`}>
                                {`ตึก ${item.id} - ${item.name}`}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
      </ul>
      {/* ปุ่ม login logout */}
      <div className="ml-6 mb-4 mt-2">
        {session ? (
          <NavButton label="ออกจากระบบ" onClick={handleLogout} />
        ) : (
          <NavButton label="เข้าสู่ระบบ" onClick={handleLogin} />
        )}
      </div>
    </div>
  );
}

export default Menu;
