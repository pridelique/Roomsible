"use client";

import NavBuilding from "./NavBuilding";
import NavList from "./NavList";
import React, { useEffect, useRef, useState } from "react";
import NavDropdown from "./NavDropdown";
import { Calendar } from "@public/assets/icons";

function NavLink({ navLink, session, checkPath, handleToggleTime }) {
  const [navDropdown, setNavDropdown] = useState(false);
  const navDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {      
      if (
        navDropdownRef.current &&
        !navDropdownRef.current.contains(event.target)
      ) {
        setNavDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return (
    <>
      {navLink
        // .filter((item) => session || !item.session)
        .map((item) => {
          if (item.label !== "ตึก")
            return (
              <React.Fragment key={item.label}>
                <NavList key={item.label} item={item} checkPath={checkPath} />
                {/* {item.label === "หน้าแรก" && !session && (
                  <li className="mt-0.5 hover:bg-gray-100 p-1 rounded-full">
                    <button
                      className="w-fit h-fit flex justify-center items-center cursor-pointer opacity-80"
                      onClick={() => setTimeout(() => handleToggleTime(), 0)}
                    >
                      <Calendar className="w-7 h-7" />
                    </button>
                  </li>
                )} */}
              </React.Fragment>
            );
          return (
            <React.Fragment key={item.label}>
              <li key={item.label} className="relative h-full flex justify-center items-center">
                <NavBuilding
                  item={item}
                  setNavDropdown={setNavDropdown}
                  navDropdown={navDropdown}
                  checkPath={checkPath}
                />
                {navDropdown && (
                  <NavDropdown ref={navDropdownRef} checkPath={checkPath} setNavDropdown={setNavDropdown}/>
                )}
              </li>
              {/* {session && ( */}
                {/* <li className="mt-0.5 hover:bg-gray-100 active:bg-gray-200 p-1 rounded-full">
                  <button
                    className="w-fit h-fit flex justify-center items-center cursor-pointer opacity-80"
                    onClick={() => setTimeout(() => handleToggleTime(), 0)}
                  >
                    <Calendar className="w-7 h-7" />
                  </button>
                </li> */}
              {/* )} */}
            </React.Fragment>
          );
        })}
    </>
  );
}

export default NavLink;
