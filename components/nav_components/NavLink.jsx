"use client";

import NavBuilding from "./NavBuilding";
import NavList from "./NavList";
import React, { useEffect, useRef, useState } from "react";
import NavDropdown from "./NavDropdown";
import Image from "@node_modules/next/image";
import { clock } from "@public/assets/icons";

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
        .filter((item) => session || !item.session)
        .map((item) => {
          if (item.label !== "ตึก")
            return (
              <React.Fragment key={item.label}>
                <NavList key={item.label} item={item} checkPath={checkPath} />
                {item.label === "หน้าแรก" && !session && (
                  <li className="mt-0.5 hover:bg-gray-100 p-1 rounded-full">
                    <button
                      className="w-fit h-fit flex justify-center items-center cursor-pointer opacity-80"
                      onClick={() => handleToggleTime()}
                    >
                      <Image src={clock} alt="clock" width={26} height={26} />
                    </button>
                  </li>
                )}
              </React.Fragment>
            );
          return (
            <React.Fragment key={item.label}>
              <li key={item.label} className="relative">
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
              {session && (
                <li className="mt-0.5 hover:bg-gray-100 p-1 rounded-full">
                  <button
                    className="w-fit h-fit flex justify-center items-center cursor-pointer opacity-80"
                    onClick={() => handleToggleTime()}
                  >
                    <Image src={clock} alt="clock" width={26} height={26} />
                  </button>
                </li>
              )}
            </React.Fragment>
          );
        })}
    </>
  );
}

export default NavLink;
