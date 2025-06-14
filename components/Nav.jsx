"use client";

import { navLink } from "@data";
import Image from "@node_modules/next/image";
import { building, menu } from "@public/assets/icons";
import { useContext, useState } from "react";
import NavButton from "./nav_components/NavButton";
import { usePathname, useRouter } from "@node_modules/next/navigation";
import Logo from "./nav_components/Logo";
import Menu from "./nav_components/Menu";
import NavLink from "./nav_components/NavLink";
import Date from "./nav_components/Date";
import Time from "./nav_components/Time";
import { DateTimeContext } from "@provider/DateTimeProvider";
import { SessionContext } from "@provider/SessionProvider";
import MenuIcon from "@public/assets/icons/menu.svg";
function Nav() {
  const [isShow, setIsShow] = useState(false);
  const [isShowtime, setIsShowTime] = useState(false);
  const { day, setDay, period, setPeriod } = useContext(DateTimeContext)
  const [dateDropdown, setDateDropdown] = useState(false);
  const [timeDropDown, setTimeDropdown] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser } = useContext(SessionContext)
  
  const handleLogout = () => {
    setUser(null);
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleToggleTime = () => {
    setIsShowTime(!isShowtime);
  };

  const checkPath = (item) => {
    if (item.label === "ตึก" && item.id) {
      return pathname === `/building/${item.id}`;
    }
    if (item.label === "ตึก") return pathname.startsWith("/building");
    return pathname === item.path;
  };

  return (
    <header className="z-10 relative w-full text-[17px]">
      <nav
        className={`flex justify-between items-center w-full padding-x py-3 ${
          isShow ? "shadow-sm" : "shadow-md"
        } relative z-10`}
      >
        {/* โลโก้ */}
        <Logo />

        {/* Link */}
        <ul className="hidden md:flex md:gap-1 lg:gap-2 text-slate-gray items-center">
          {isShowtime ? (
            <>
              <Date day={day} setDay={setDay} dateDropdown={dateDropdown} setDateDropdown={setDateDropdown}/>
              <li>
                {/* ปุ่ม toggle time */}
                <button
                  className="w-fit h-fit flex justify-center items-center transition-transform duration-300 mt-0.5 p-2 mx-2 rounded-full hover:bg-gray-200 cursor-pointer opacity-60"
                  onClick={() => setTimeout(() => handleToggleTime(), 0)}
                >
                  <Image src={building} alt="building" width={20} height={20} />
                </button>
              </li>
              <Time period={period} setPeriod={setPeriod} timeDropdown={timeDropDown} setTimeDropdown={setTimeDropdown}/>
            </>
          ) : (
            <NavLink
              navLink={navLink}
              session={user}
              checkPath={checkPath}
              handleToggleTime={handleToggleTime}
            />
          )}
        </ul>

        {/* วัน คาบ */}
        <ul className="flex md:hidden gap-3 text-slate-gray">
          <Date day={day} setDay={setDay} dateDropdown={dateDropdown} setDateDropdown={setDateDropdown} />
          <Time period={period} setPeriod={setPeriod} timeDropdown={timeDropDown} setTimeDropdown={setTimeDropdown} />
        </ul>

        <div className="hidden md:flex justify-center items-center gap-4">
          {/* ปุ่ม login logout */}
          <NavButton
            session={user}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
          />
        </div>

        {/* ปุ่มเมนู */}
        <button
          className="rounded-xl hover:bg-gray-100 p-2 flex md:hidden justify-center items-center"
          onClick={() => setTimeout(() => setIsShow(!isShow),0)}
        >
          <MenuIcon className='size-[28px]'/>
        </button>
      </nav>

      {/* เมนู */}
      {isShow && (
        <Menu
          setIsShow={setIsShow}
          session={user}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          checkPath={checkPath}
        />
      )}
    </header>
  );
}

export default Nav;

