"use client";

import { navLink } from "@data";
import { use, useContext, useEffect, useRef, useState } from "react";
import NavButton from "@components/nav_components/NavButton";
import { usePathname, useRouter } from "@node_modules/next/navigation";
import Logo from "@components/nav_components/Logo";
import Menu from "@components/nav_components/Menu";
import NavLink from "@components/nav_components/NavLink";
import { DateTimeContext } from "@provider/DateTimeProvider";
import { SessionContext } from "@provider/SessionProvider";
import MenuIcon from "@public/assets/icons/menu.svg";
import { notifyError, notifySuccess } from "@utils/notify";
import Profile from "@components/nav_components/Profile";
import { supabase } from "@utils/supabase";
import DayPeriodSelector from "@components/nav_components/DayPeriodSelector";

function Nav() {
  const [isShow, setIsShow] = useState(false);
  const [isShowtime, setIsShowTime] = useState(null);
  const { day, setDay, period, setPeriod } = useContext(DateTimeContext);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser } = useContext(SessionContext);
  const dateRef = useRef(null);
  const timeRef = useRef(null);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
      if (innerWidth < 480) {
        notifyError(
          "เกิดข้อผิดพลาดในการออกจากระบบ กรุณาลองใหม่อีกครั้ง",
          "center"
        );
      } else {
        notifyError(
          "เกิดข้อผิดพลาดในการออกจากระบบ กรุณาลองใหม่อีกครั้ง",
          "top-right"
        );
      }
      return;
    }
    if (innerWidth < 480) {
      notifySuccess("คุณออกจากระบบเรียบร้อยแล้ว", "top-center");
    } else {
      notifySuccess("คุณออกจากระบบเรียบร้อยแล้ว", "top-right");
    }
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

  return (
    <header className="z-10 relative w-full text-[17px] bg-white">
      <nav
        className={`flex justify-between items-center w-full padding-x h-[75px] ${
          isShow ? "shadow-sm" : "shadow-md"
        } relative z-10`}
      >
        {/* โลโก้ */}
        <Logo />
        {/* Link */}
        <ul className="flex flex-1 max-[850px]:hidden md:gap-1 lg:gap-2 text-slate-gray items-center justify-between h-full">
          <>
            <div className="flex items-center ml-2 h-full">
              <NavLink
                navLink={navLink}
                session={user}
                checkPath={checkPath}
                handleToggleTime={handleToggleTime}
              />
            </div>
          </>
        </ul>
        
        <div className="flex space-x-2 items-center">
          <DayPeriodSelector
            day={day}
            setDay={setDay}
            period={period}
            setPeriod={setPeriod}
          />
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
        </div>
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
