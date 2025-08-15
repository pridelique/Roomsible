"use client";

import { navLink } from "@data";
import Image from "@node_modules/next/image";
import { building } from "@public/assets/icons";
import { use, useContext, useEffect, useRef, useState } from "react";
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
import { notifySuccess } from "@utils/notify";
import Profile from "./nav_components/Profile";
import { supabase } from "@utils/supabase";

const dayWidth = {
  monday: 134.35000610351562,
  tuesday: 142.1999969482422,
  wednesday: 115.2249984741211,
  thursday: 162.0124969482422,
  friday: 124.5374984741211,
};

const periodWidth = {
  1: 113.8375015258789,
  2: 117.07500457763672,
  3: 117.23750305175781,
  4: 117.6500015258789,
  5: 117.17500305175781,
  6: 118.1624984741211,
  7: 116.88750457763672,
  8: 118.45000457763672,
  9: 118.1624984741211,
  10: 125.7125015258789,
};

function Nav() {
  const [isShow, setIsShow] = useState(false);
  const [isShowtime, setIsShowTime] = useState(null);
  const { day, setDay, period, setPeriod } = useContext(DateTimeContext);
  const [loading, setLoading] = useState(true);
  const [dateDropdown, setDateDropdown] = useState(false);
  const [timeDropDown, setTimeDropdown] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser } = useContext(SessionContext);
  const dateRef = useRef(null);
  const timeRef = useRef(null); 

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
      notifySuccess("เกิดข้อผิดพลาดในการออกจากระบบ กรุณาลองใหม่อีกครั้ง");
      return;
    }
    notifySuccess("คุณออกจากระบบเรียบร้อยแล้ว!");
    setIsShow(false);
    router.push("/");
  };

  const handleLogin = () => {
    setIsShow(false);
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

  // Set nav mode in sessionStorage
  useEffect(() => {
    if (isShowtime == null) return;
    // console.log("Setting nav mode:", isShowtime ? "time" : "building");
    
    sessionStorage.setItem("nav_mode", isShowtime ? "time" : "building");
  }, [isShowtime])

  // Set initial nav mode from sessionStorage
  useEffect(() => {
    const data = sessionStorage.getItem("nav_mode");
    console.log(data);
    
    if (pathname.startsWith("/building") || data === "time") {
      setIsShowTime(true);
    } else {
      setIsShowTime(false);
    }
    setLoading(false);
  }, [pathname]);

  useEffect(() => {
    console.log("User session:", user);
  }, [user]);

  useEffect(() => {
    console.log(dateRef.current?.getBoundingClientRect()?.width);
    console.log(timeRef.current?.getBoundingClientRect()?.width);

  },[day, period]);

  return (
    <header className="z-10 relative w-full text-[17px] bg-white">
      <nav
        className={`flex justify-between items-center w-full padding-x py-3 ${
          isShow ? "shadow-sm" : "shadow-md"
        } relative z-10`}
      >
        {/* โลโก้ */}
        <Logo />
        {!loading && (
          <>
            {/* Link */}
            <ul className="flex max-[850px]:hidden md:gap-1 lg:gap-2 text-slate-gray items-center absolute left-1/2 -translate-x-1/2">
              {isShowtime ? (
                <>
                  <li className="text-slate-gray relative" ref={dateRef}>
                    <Date
                      day={day}
                      setDay={setDay}
                      dateDropdown={dateDropdown}
                      setDateDropdown={setDateDropdown}
                    />
                  </li>
                  <li>
                    {/* ปุ่ม toggle time */}
                    <button
                      className="w-fit h-fit flex justify-center items-center transition-transform duration-300 mt-0.5 p-2 mx-2 rounded-full hover:bg-gray-200 active:bg-gray-300 cursor-pointer opacity-60"
                      onClick={() => setTimeout(() => handleToggleTime(), 0)}
                    >
                      <Image
                        src={building}
                        alt="building"
                        width={20}
                        height={20}
                      />
                    </button>
                  </li>
                  <li
                    className="text-slate-gray relative mr-3"
                    style={{ marginRight: dayWidth[day] - periodWidth[period] }}
                    ref={timeRef}
                  >
                    <Time
                      period={period}
                      setPeriod={setPeriod}
                      timeDropdown={timeDropDown}
                      setTimeDropdown={setTimeDropdown}
                    />
                  </li>
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
            <ul className="hidden max-[850px]:flex gap-3 max-[380px]:gap-0 text-slate-gray">
              <li className="text-slate-gray relative">
                <Date
                  day={day}
                  setDay={setDay}
                  dateDropdown={dateDropdown}
                  setDateDropdown={setDateDropdown}
                />
              </li>
              <li className="text-slate-gray relative">
                <Time
                  period={period}
                  setPeriod={setPeriod}
                  timeDropdown={timeDropDown}
                  setTimeDropdown={setTimeDropdown}
                />
              </li>
            </ul>
          </>
        )}

        <div className="flex max-[850px]:hidden justify-center items-center gap-4">
          {/* ปุ่ม login logout */}
          {user != "loading" && (
            <>
              {user ? (
                <Profile handleLogout={handleLogout} />
              ) : (
                <NavButton
                  session={user}
                  handleLogin={handleLogin}
                  handleLogout={handleLogout}
                />
              )}
            </>
          )}
        </div>

        {/* ปุ่มเมนู */}
        <button
          className="rounded-xl hover:bg-gray-100 active:bg-gray-200 p-2 hidden max-[850px]:flex justify-center items-center cursor-pointer"
          onClick={() => setTimeout(() => setIsShow(!isShow), 0)}
        >
          <MenuIcon className="size-[28px]" />
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
