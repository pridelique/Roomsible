"use client";

import { navBuildings, navLink } from "@data";
import Image from "@node_modules/next/image";
import Link from "@node_modules/next/link";
import { arrow_down, arrow_down_selected, menu } from "@public/assets/icons";
import { useEffect, useState } from "react";
import NavButton from "./NavButton";
import { useRouter } from "@node_modules/next/router";
import { usePathname } from "@node_modules/next/navigation";
import Logo from "./Logo";
import Menu from "./Menu";

function Nav() {
  const [isShow, setIsShow] = useState(false);
  const [navDropdown, setNavDropdown] = useState(false);
  const [session, setSession] = useState("sdf");
  const pathname = usePathname();
  const handleLogout = () => {
    setSession(null);
  };

  const handleLogin = () => {
    setSession("user");
  };

  const checkPath = (item) => {
    if (item.label === 'ตึก' && item.id) {
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
        <ul className="hidden md:flex md:gap-8 lg:gap-16 text-slate-gray">
          {navLink
            .filter((item) => session || !item.session)
            .map((item) => {
              if (item.label !== "ตึก")
                return (
                  <li key={item.label}>
                    <Link
                      href={item.path}
                      className={`${
                        checkPath(item) ? "text-red-400" : "text-slate-gray"
                      } block px-4 py-2`}
                    >
                      <p>{item.label}</p>
                    </Link>
                  </li>
                );
              return (
                <li key={item.label} className="relative">
                  <button className="cursor-pointer px-4 py-2 flex gap-2 items-center" onClick={() => setNavDropdown(!navDropdown)}>
                    <p className={` ${checkPath(item) ? "text-red-400" : "text-slate-gray"}`}>{item.label}</p> 
                    <div className="flex items-center justify-center relative top-[1.5px]">
                      <Image
                        src={checkPath(item) ? arrow_down_selected : arrow_down}
                        alt="arrow_down"
                        width={20}
                        height={20}
                        className={`${navDropdown ? "rotate-180" : ""} duration-100`}
                      />
                    </div>
                  </button>
                    {navDropdown && (
                      <div className="absolute top-full border border-gray-300 shadow-lg z-9 bg-white">
                        <ul>
                          {navBuildings.map((item) => (
                            <li key={item.id}>
                              <Link
                                href={`/building/${item.id}`}
                                className="w-64 text-start  block px-5 py-2.5 hover:bg-gray-100"
                              >
                                <p className={` ${checkPath(item) ? 'text-red-400' : 'text-slate-gray'}`}>
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
        {session ? (
          <div className="hidden md:flex">
            <NavButton label="ออกจากระบบ" onClick={handleLogout} />
          </div>
        ) : (
          <div className="hidden md:flex">
            <NavButton label="เข้าสู่ระบบ" onClick={handleLogin} />
          </div>
        )}

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
