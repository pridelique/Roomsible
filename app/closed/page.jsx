"use client";
import React, { useState, useEffect, useRef } from "react";
import "@styles/filpClock.css";
import Image from "@node_modules/next/image";
import { swBackground } from "@public/assets/images";
import { supabase } from "@utils/supabase";
import { useRouter } from "@node_modules/next/navigation";

const monthNames = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

const checkClosedSchedule = async (supabase, nowTime, setOpenDate, router) => {
  const { data: closedDates, error } = await supabase
    .from("closed_schedules")
    .select("id, closed_from, open_at")
    .order("closed_from", { ascending: true });
  if (error) {
    console.error("error fetching closed schedules:", error);
    return;
  }
  var openDate = null;
  closedDates.map((date) => {
    const closedFrom = new Date(`${date.closed_from}+07:00`);
    const openAt = new Date(`${date.open_at}+07:00`);
    // console.log(closedFrom);
    // console.log(openAt);

    // console.log(closedFrom.toString());
    // console.log(openAt.toString());

    const closedTime = closedFrom.getTime();
    const openTime = openAt.getTime();

    if (closedTime <= nowTime && nowTime < openTime) {
      if (openDate === null) openDate = openAt;
      else if (openDate.getTime() < openTime) openDate = openAt;
    }
  });

  if (openDate !== null) {
    // console.log(openDate);
    setOpenDate(openDate);
  } else {
    router.push("/");
  }
  // console.log(openDate);

  // console.log(closedDates);
};

function ClosedPage() {
  const clockInterval = useRef(null);
  const router = useRouter();
  const [openDate, setOpenDate] = useState(null);

  function flipTo(digit, n) {
    var current = digit.getAttribute("data-num");
    digit.setAttribute("data-num", n);
    digit.querySelector(".front").setAttribute("data-content", current);
    digit.querySelector(".back").setAttribute("data-content", n);
    digit.querySelector(".under").setAttribute("data-content", n);
    digit.querySelector(".front").style.display = "block";
    digit.querySelector(".back").style.display = "block";
    digit.querySelector(".under").style.display = "block";
    setTimeout(function () {
      digit.querySelector(".base").textContent = n;
      digit.querySelector(".front").style.display = "none";
      digit.querySelector(".back").style.display = "none";
      digit.querySelector(".under").style.display = "none";
    }, 350);
  }

  function jumpTo(digit, n) {
    digit.setAttribute("data-num", n);
    digit.querySelector(".base").textContent = n;
  }

  function updateGroup(group, n, flip) {
    var digit1 = document.querySelector(".ten" + group);
    var digit2 = document.querySelector("." + group);
    n = String(n);
    if (n.length == 1) n = "0" + n;
    var num1 = n.substr(0, 1);
    var num2 = n.substr(1, 1);
    if (digit1.getAttribute("data-num") != num1) {
      if (flip) flipTo(digit1, num1);
      else jumpTo(digit1, num1);
    }
    if (digit2.getAttribute("data-num") != num2) {
      if (flip) flipTo(digit2, num2);
      else jumpTo(digit2, num2);
    }
  }

  function setTime(flip) {
    const now = new Date();
    const diff = openDate - now;

    if (diff <= 0) {
      clearInterval(clockInterval.current);
      router.push("/");
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    updateGroup("day", days, flip);
    updateGroup("hour", hours, flip);
    updateGroup("min", minutes, flip);
    updateGroup("sec", seconds, flip);
  }

  useEffect(() => {
    const nowTime = new Date().getTime();
    checkClosedSchedule(supabase, nowTime, setOpenDate, router);
  }, []);

  useEffect(() => {
    if (clockInterval.current) return;
    if (openDate !== null) {
      setTime(false);
      clockInterval.current = setInterval(() => {
        setTime(true);
      }, 1000);
    }
  }, [openDate]);

  return (
    <div className="z-200 relative h-svh w-svw bg-black overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <Image
          src={swBackground}
          alt="background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>
      </div>
      {openDate && (
        <div>
          <div className="flex flex-col items-center justify-center text-white mb-6 px-8 mt-20">
            <h1 className="text-4xl md:text-5xl font-semibold text-center flex max-[440px]:flex-col">
              <p>ขณะนี้ยังไม่เปิด</p>
              <p>ให้บริการ</p>
            </h1>
            <h2 className="text-sm sm:text-base md:text-lg mt-3 text-center flex max-[440px]:flex-col">
              <p>ระบบจะเปิดให้บริการอีกครั้งใน</p>
              <p>
                วันที่ {openDate.getDate()} {monthNames[openDate.getMonth()]}{" "}
                {openDate.getFullYear() + 543}
              </p>
            </h2>
          </div>

          <div className="clock flex flex-row flex-wrap items-center justify-center max-[440px]:gap-2 gap-4 sm:gap-6 md:gap-10">
            {/* วัน */}
            <div className="flex flex-col items-center">
              <div className="flex max-[440px]:gap-0.5 gap-1 sm:gap-2">
                <div className="digit relative max-[440px]:w-8 max-[440px]:h-12 w-10 h-15 sm:w-14 sm:h-21 md:w-16 md:h-24 bg-white rounded-md text-center max-[440px]:text-[26px] text-[32px] sm:text-[44px] md:text-[52px] text-[#333] font-semibold tenday">
                  <span className="base"></span>
                  <div className="rounded-md flap over front"></div>
                  <div className="rounded-md flap over back"></div>
                  <div className="rounded-md flap under"></div>
                </div>
                <div className="digit relative max-[440px]:w-8 max-[440px]:h-12 w-10 h-15 sm:w-14 sm:h-21 md:w-16 md:h-24 bg-white rounded-md text-center max-[440px]:text-[26px] text-[32px] sm:text-[44px] md:text-[52px] text-[#333] font-semibold day">
                  <span className="base"></span>
                  <div className="rounded-md flap over front"></div>
                  <div className="rounded-md flap over back"></div>
                  <div className="rounded-md flap under"></div>
                </div>
              </div>
              <p className="text-white text-center mt-2 max-[440px]:text-xs text-sm sm:text-base md:text-[20px]">
                วัน
              </p>
            </div>

            {/* ชั่วโมง */}
            <div className="flex flex-col items-center">
              <div className="flex max-[440px]:gap-0.5 gap-1 sm:gap-2">
                <div className="digit relative max-[440px]:w-8 max-[440px]:h-12 w-10 h-15 sm:w-14 sm:h-21 md:w-16 md:h-24 bg-white rounded-md text-center max-[440px]:text-[26px] text-[32px] sm:text-[44px] md:text-[52px] text-[#333] font-semibold tenhour">
                  <span className="base"></span>
                  <div className="rounded-md flap over front"></div>
                  <div className="rounded-md flap over back"></div>
                  <div className="rounded-md flap under"></div>
                </div>
                <div className="digit relative max-[440px]:w-8 max-[440px]:h-12 w-10 h-15 sm:w-14 sm:h-21 md:w-16 md:h-24 bg-white rounded-md text-center max-[440px]:text-[26px] text-[32px] sm:text-[44px] md:text-[52px] text-[#333] font-semibold hour">
                  <span className="base"></span>
                  <div className="rounded-md flap over front"></div>
                  <div className="rounded-md flap over back"></div>
                  <div className="rounded-md flap under"></div>
                </div>
              </div>
              <p className="text-white text-center mt-2 max-[440px]:text-xs text-sm sm:text-base md:text-[20px]">
                ชั่วโมง
              </p>
            </div>

            {/* นาที */}
            <div className="flex flex-col items-center">
              <div className="flex max-[440px]:gap-0.5 gap-1 sm:gap-2">
                <div className="digit relative max-[440px]:w-8 max-[440px]:h-12 w-10 h-15 sm:w-14 sm:h-21 md:w-16 md:h-24 bg-white rounded-md text-center max-[440px]:text-[26px] text-[32px] sm:text-[44px] md:text-[52px] text-[#333] font-semibold tenmin">
                  <span className="base"></span>
                  <div className="rounded-md flap over front"></div>
                  <div className="rounded-md flap over back"></div>
                  <div className="rounded-md flap under"></div>
                </div>
                <div className="digit relative max-[440px]:w-8 max-[440px]:h-12 w-10 h-15 sm:w-14 sm:h-21 md:w-16 md:h-24 bg-white rounded-md text-center max-[440px]:text-[26px] text-[32px] sm:text-[44px] md:text-[52px] text-[#333] font-semibold min">
                  <span className="base"></span>
                  <div className="rounded-md flap over front"></div>
                  <div className="rounded-md flap over back"></div>
                  <div className="rounded-md flap under"></div>
                </div>
              </div>
              <p className="text-white text-center mt-2 max-[440px]:text-xs text-sm sm:text-base md:text-[20px]">
                นาที
              </p>
            </div>

            {/* วินาที */}
            <div className="flex flex-col items-center">
              <div className="flex max-[440px]:gap-0.5 gap-1 sm:gap-2">
                <div className="digit relative max-[440px]:w-8 max-[440px]:h-12 w-10 h-15 sm:w-14 sm:h-21 md:w-16 md:h-24 bg-white rounded-md text-center max-[440px]:text-[26px] text-[32px] sm:text-[44px] md:text-[52px] text-[#333] font-semibold tensec">
                  <span className="base"></span>
                  <div className="rounded-md flap over front"></div>
                  <div className="rounded-md flap over back"></div>
                  <div className="rounded-md flap under"></div>
                </div>
                <div className="digit relative max-[440px]:w-8 max-[440px]:h-12 w-10 h-15 sm:w-14 sm:h-21 md:w-16 md:h-24 bg-white rounded-md text-center max-[440px]:text-[26px] text-[32px] sm:text-[44px] md:text-[52px] text-[#333] font-semibold sec">
                  <span className="base"></span>
                  <div className="rounded-md flap over front"></div>
                  <div className="rounded-md flap over back"></div>
                  <div className="rounded-md flap under"></div>
                </div>
              </div>
              <p className="text-white text-center mt-2 max-[440px]:text-xs text-sm sm:text-base md:text-[20px]">
                วินาที
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-white mb-6 px-8 opacity-0">
            <h1 className="text-4xl md:text-5xl font-semibold text-center flex max-[440px]:flex-col">
              <p>ขณะนี้ยังไม่เปิด</p>
              <p>ให้บริการ</p>
            </h1>
            <h2 className="text-sm sm:text-base md:text-lg mt-3 text-center flex max-[440px]:flex-col">
              <p>ระบบจะเปิดให้บริการอีกครั้งใน</p>
              <p>
                วันที่ {openDate.getDate()} {monthNames[openDate.getMonth()]}{" "}
                {openDate.getFullYear() + 543}
              </p>
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClosedPage;
