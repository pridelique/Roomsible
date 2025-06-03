"use client";

import { navLink } from "@data";
import Image from "@node_modules/next/image";
import { menu } from "@public/assets/icons";
import {  useState } from "react";
import NavButton from "./nav_components/NavButton";
import { usePathname } from "@node_modules/next/navigation";
import Logo from "./nav_components/Logo";
import Menu from "./nav_components/Menu";
import NavLink from "./nav_components/NavLink";

function Nav() {
  const [isShow, setIsShow] = useState(false);
  const [session, setSession] = useState("sdf");
  const pathname = usePathname();

  const handleLogout = () => {
    setSession(null);
  };

  const handleLogin = () => {
    setSession("user");
  };

  const checkPath = (item) => {
    if (item.label === "ตึก" && item.id) {
      return pathname === `/building/${item.id}`;
    }
    if (item.label === "ตึก") return pathname.startsWith("/building");
    return pathname === item.path;
  };

  return (
    <header className="z-10 absolute w-full text-[17px]">
      <nav
        className={`flex justify-between items-center w-full padding-x py-3 ${
          isShow ? "shadow-sm" : "shadow-md"
        } relative z-10`}
      >
        {/* โลโก้ */}
        <Logo />

        {/* Link */}
        <NavLink navLink={navLink} session={session} checkPath={checkPath} />

        {/* ปุ่ม login logout */}
        <div className="hidden md:flex">
          <NavButton
            session={session}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
          />
        </div>

        {/* ปุ่มเมนู */}
        <button
          className="rounded-xl hover:bg-gray-100 p-2 flex md:hidden justify-center items-center"
          onClick={() => setIsShow(!isShow)}
        >
          <Image src={menu} alt="menu" width={28} height={28} />
        </button>
      </nav>

      {/* เมนู */}
      {isShow && (
        <Menu
          setIsShow={setIsShow}
          session={session}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          checkPath={checkPath}
        />
      )}
    </header>
  );
}

export default Nav;

