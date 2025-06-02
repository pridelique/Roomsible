"use client";

import Image from "@node_modules/next/image";
import Link from "@node_modules/next/link";
import { menu } from "@public/assets/icons";
import { logo } from "@public/assets/images";
import { useState } from "react";

function Nav() {
  const [isShow, setIsShow] = useState(false);
  const [session, setSession] = useState('sdf');
  return (
    <header className="padding-x py-6 z-10 relative w-full">
      <nav className="flex justify-between items-center w-full">
        <Link href="/">
          <Image src={logo} alt="logo" width={150} height={80} />
        </Link>
        {session ? (
          <>
            <ul className="hidden md:flex gap-12 text-lg text-slate-gray">
              <li>
                <Link href="/checkin">เช็คอิน</Link>
              </li>
              <li>
                <Link href="/profile">ประวัติ</Link>
              </li>
              <li>
                <button className="hover:cursor-pointer" onClick={() => setSession(null)}>ออกจากระบบ</button>
              </li>
            </ul>
            <div className="md:hidden flex justify-center items-center relative">
              <button
                className="rounded-full hover:bg-gray-100 p-2"
                onClick={() => setIsShow(!isShow)}
              >
                <Image src={menu} alt="menu" width={28} height={28} />
              </button>
              {isShow && (
                <div className="w-40 absolute border border-gray-300 top-12 right-0 rounded-lg bg-white flex flex-col justify-start items-start text-slate-gray gap-2 overflow-hidden ">
                  <ul className="w-full">
                    <li className="hover:bg-gray-100 w-full">
                      <Link className="block px-3 py-2 w-full" href="/checkin" onClick={() => setIsShow(false)}>เช็คอิน</Link>
                    </li>
                    <li className="hover:bg-gray-100 w-full">
                      <Link className="block px-3 py-2 w-full" href="/profile" onClick={() => setIsShow(false)}>ประวัติ</Link>
                    </li>
                    <li className="hover:bg-gray-100 w-full">
                      <button className="block px-3 py-2 w-full hover:cursor-pointer text-start" onClick={() => {setSession(null);setIsShow(false)}}>ออกจากระบบ</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        ) : (
          <ul className="flex gap-12 text-lg text-slate-gray">
            <li>
              <button className="hover:cursor-pointer" onClick={() => setSession("user")}>เข้าสู่ระบบ</button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Nav;
