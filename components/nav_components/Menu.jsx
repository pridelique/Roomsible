"use client";
import { navBuildings, navLink } from "@data";
import Image from "@node_modules/next/image";
import Link from "@node_modules/next/link";
import NavButton from "./NavButton";
import { useState } from "react";
import { arrow_down, arrow_down_selected } from "@public/assets/icons";
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

  return (
    <div className="flex md:hidden w-full bg-white shadow-md relative z-9 text-base flex-col">
      {/* Link */}
      <ul className="w-full">
        {navLink
          .filter((item) => session || !item.session)
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
