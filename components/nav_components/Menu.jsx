"use client";
import { navLink } from "@data";
import { useEffect, useRef, useState } from "react";
import NavButton from "./NavButton";
import MenuList from "./MenuList";
import MenuBuilding from "./MenuBuilding";
import MenuDropdown from "./MenuDropdown";

function Menu({
  setIsShow,
  session,
  handleLogout,
  handleLogin,
  checkPath,
}) {

  const [menuDropdown, setMenuDropdown] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsShow(false);
        setMenuDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  })

  return (
    <div className="hidden max-[850px]:flex w-full bg-white shadow-md absolute z-9 text-base flex-col rounded-b-xl" ref={menuRef}>
      {/* Link */}
      <ul className="w-full">
        {navLink
          // .filter((item) => session || !item.session)
          .map((item) => {
            if (item.label !== "ตึก")
              return (
                <MenuList
                  key={item.label}
                  item={item}
                  setIsShow={setIsShow}
                  checkPath={checkPath}
                />
              );
            return (
              <li key={item.label} className="relative">
                <MenuBuilding
                  item={item}
                  menuDropdown={menuDropdown}
                  setMenuDropdown={setMenuDropdown}
                  checkPath={checkPath}
                />
                {menuDropdown && (
                  <MenuDropdown
                    setIsShow={setIsShow}
                    checkPath={checkPath}
                  />
                )}
              </li>
            );
          })}
      </ul>
      {/* ปุ่ม login logout */}
      <div className="ml-6 mb-4 mt-2">
        <NavButton
          session={session}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
      </div>
    </div>
  );
}

export default Menu;
