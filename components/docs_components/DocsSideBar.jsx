"use client";
import { hashContext } from "@app/docs/layout";
import { DocsSideBarList, hashToTitle } from "@data/DocsSideBar";
import { List } from "@node_modules/lucide-react";
import { Arrow_down } from "@public/assets/icons";
import React, { useContext, useEffect, useState } from "react";

function DocsSideBar() {
  const [isShow, setIsShow] = useState(false);
  const { hash, setHash } = useContext(hashContext);

  return (
    <>
      {/* Top Bar */}
      <div className="absolute w-full h-16 border-b border-gray-200 bg-white flex items-center px-4 gap-4 lg:hidden z-5">
        <span
          className="p-2 rounded-md hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
          onClick={() => setIsShow(!isShow)}
        >
          <List className="w-6 h-6 text-gray-600" />
        </span>
        <div className="flex items-center gap-2">
          <span>
            <h1 className="font-medium text-gray-500">คู่มือการใช้งาน</h1>
          </span>
          <span>
            <Arrow_down className="w-4.5 h-4.5 -rotate-90 text-gray-700" />
          </span>
          <span>{hashToTitle[hash]}</span>
        </div>
      </div>
      {/* Side Bar */}
      <div
        className={`absolute w-50 border-r flex-1 border-gray-200 h-full bg-white ${
          isShow ? "translate-x-0" : "translate-x-[-100%]"
        } lg:translate-x-0 top-0 left-0 pt-4 max-lg:pt-20 transition duration-300 ease-in-out z-4`}
      >
        <ul>
          {DocsSideBarList.map((item, index) => (
            <li
              key={index}
              className={`py-3 px-4 hover:bg-gray-100 active:bg-gray-200 cursor-pointer ${
                hash === item.id
                  ? "text-gray-800 bg-gray-100"
                  : "text-gray-600"
              }`}
              onClick={() => {
                  // ถ้า hash เดิม ให้บังคับ scroll และ setHash เอง
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                setIsShow(false);
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
      {isShow && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-3 lg:hidden transition-all duration-300"
          onClick={() => setIsShow(false)}
        />
      )}
    </>
  );
}

export default DocsSideBar;
