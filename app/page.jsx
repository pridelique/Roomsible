"use client";
import Building from "@components/building_components/Building";
import { buildings, status } from "@data";
import { useRouter } from "@node_modules/next/navigation";
import { useRef, useEffect, useState, useContext, use } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { addDays, getDate, getDay, getMonth, getYear } from "date-fns";
import { DateTimeContext } from "../provider/DateTimeProvider";
import { timeSlots } from "@data";
import { getCurrentDay, getCurrentPeriod } from "@utils/currentDayPeriod";
import { dayEnToThai } from "@utils/translateDay";
import { InfoIcon } from "@public/assets/icons";
import { RefreshCcw, RefreshCw } from "@node_modules/lucide-react";
import RefreshButton from "@components/building_components/RefreshButton";
const mapDay = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
};

const thaiMonth = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

export default function HomePage() {
  const { currentDay, currentPeriod } = useContext(DateTimeContext);
  const setDay = getCurrentDay();
  const setPeriod = getCurrentPeriod();
  const router = useRouter();
  const outestRef = useRef(null);
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const building5Ref = useRef(null);
  const building6Ref = useRef(null);
  const resizeRef = useRef(null);
  const tooltipRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [scale, setScale] = useState(1);
  const [monday, setMonday] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [zooming, setZooming] = useState(false);
  const { day, period } = useContext(DateTimeContext);
  const [screenHeight, setScreenHeight] = useState("100");
  const [containerStyle, setContainerStyle] = useState({
    width: "100%",
    justifyContent: "center",
  });
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [building5Size, setBuilding5Size] = useState({ width: 0, height: 0 });
  const [building6Size, setBuilding6Size] = useState({ width: 0, height: 0 });

  // const resetMessage = () => {
  //   if (window.timeOutZooming) clearTimeout(window.timeOutZooming);
  //   window.timeOutZooming = setTimeout(() => {
  //     setZooming(false);
  //   }, 5000);
  // };

  const handleOnClick = (id) => {
    router.push(`/building/${id}`);
  };

  useEffect(() => {
    if (building5Ref.current) {
      const building5 = building5Ref.current;
      const size5 = building5.getBoundingClientRect();
      console.log(size5);

      setBuilding5Size({
        width: size5.width,
        height: size5.height,
      });
    }
    if (building6Ref.current) {
      const building6 = building6Ref.current;
      const size6 = building6.getBoundingClientRect();
      console.log(size6);

      setBuilding6Size({
        width: size6.width,
        height: size6.height,
      });
    }
  }, []);

  useEffect(
    (date = new Date()) => {
      if (!day || !period) return;
      const dayCount = getDay(date);
      if (dayCount === 0) {
        setMonday(addDays(date, 1));
        setSelectedDate(addDays(addDays(date, 1), mapDay[day]));
      } else if (dayCount === 6) {
        setMonday(addDays(date, 2));
        setSelectedDate(addDays(addDays(date, 2), mapDay[day]));
      } else {
        setMonday(addDays(date, -dayCount + 1));
        setSelectedDate(addDays(addDays(date, -dayCount + 1), mapDay[day]));
      }
    },
    [day]
  );

  useEffect(() => {
    const resize = () => {
      const outest = outestRef.current;
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outest || !outer || !inner) return;
      const scaleX = outer.clientWidth / inner.offsetWidth;
      const scaleY = outer.clientHeight / inner.offsetHeight;
      setScreenHeight(window.innerHeight - 220);
      setScale(Math.min(1, scaleX, scaleY));

      if (Math.min(1, scaleX) === 1) {
        setContainerStyle({
          width: outer.clientWidth,
          height: outer.clientHeight,
        });
      } else {
        setContainerStyle({
          width: inner.offsetWidth * scaleX,
          height: inner.offsetHeight * scaleY,
        });
      }
    };
    resize();
    setTimeout(() => {
      resize();
    }, 0);
    setTimeout(() => {
      setLoading(false);
    }, 10);
    window.addEventListener("resize", resize);
    if (resizeRef.current) clearInterval(resizeRef.current);
    resizeRef.current = setInterval(() => {
      resize();
    }, 1000);
    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(resizeRef.current);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !event.target.contains(tooltipRef.current)) {
        setShowTooltip(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="flex-1 flex flex-col w-full bg-white py-5 px-2">
      <header className="w-full max-w-5xl flex flex-col items-center mt-1 mb-5 mx-auto text-center">
        <h2 className="max-[460px]:text-[26px] text-3xl md:text-4xl font-bold text-gray-700 mb-1 drop-shadow">
          แผนผังโรงเรียนสตรีวิทยา
        </h2>
        <p className="text-gray-500 text-base md:text-lg">
          เลือกตึกที่ต้องการดูแผนผังอาคาร
        </p>
      </header>
      <div
        className={`relative w-full h-full flex-1 ${loading && "opacity-0"}`}
        ref={outestRef}
      >
        <TransformWrapper>
          <div
            className="w-full h-full flex-1"
            ref={outerRef}
            style={{ height: Math.max(screenHeight, 250) }}
          >
            <div className="bg-neutral-50 rounded-lg mx-auto mb-3 relative shadow-inner w-fit">
              {/* Tooltip */}
              <div
                className="absolute top-3 left-3 w-fit h-fit flex justify-center items-start z-3 max-[460px]:scale-80 origin-top-left"
                onClick={(e) => {
                  setShowTooltip(!showTooltip);
                }}
                ref={tooltipRef}
              >
                <span
                  tabIndex={1}
                  className="text-gray-500 hover:text-gray-600 hover:bg-gray-100 hover:scale-110 active:text-gray-700 active:bg-gray-200 active:scale-90 cursor-pointer bg-white transition duration-150 shadow-lg rounded-full p-1.5"
                >
                  <InfoIcon className="w-7 h-7" />
                </span>
                {/* {showTooltip && ( */}
                <div
                  className={`absolute left-0 top-12 bg-white border border-gray-200 rounded-lg shadow px-4 py-3 text-sm text-gray-600 z-50 whitespace-nowrap transition-all duration-300 origin-top-left ${
                    showTooltip
                      ? "scale-100 opacity-100"
                      : "scale-90 opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="font-semibold mb-2">วิธีใช้งาน</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>คลิกที่ตึกเพื่อดูรายละเอียด</li>
                    <li>สีของห้องแสดงสถานะการใช้งาน</li>
                    <li>สามารถเลื่อนและซูมแผนผังได้</li>
                  </ul>
                </div>
              </div>

              {/* Refresh button */}
              <RefreshButton refresh={refresh} setRefresh={setRefresh} />
              <TransformComponent>
                <div
                  className="cursor-grab active:cursor-grabbing w-fit h-fit mx-auto"
                  // style={containerStyle}
                >
                  <div
                    className="w-fit h-fit"
                    style={{
                      width: innerRef.current?.offsetWidth * scale || 1,
                      height: innerRef.current?.offsetHeight * scale || 1,
                    }}
                  >
                    <div
                      className="flex justify-start w-fit h-fit p-24 pt-36 origin-top-left relative"
                      style={{ transform: `scale(${scale})` }}
                      ref={innerRef}
                    >
                      {/* ตึก 5 */}
                      <div
                        className="hover:scale-105 active:scale-95 duration-300 ease-in-out transition-[scale]"
                        style={{
                          width: building5Size.width,
                          height: building5Size.height,
                        }}
                      >
                        <div
                          className="text-center cursor-pointer -rotate-90 origin-top-left w-fit h-fit translate-y-[213%]"
                          onClick={() => handleOnClick(5)}
                          ref={building5Ref}
                        >
                          <Building
                            refresh={refresh}
                            setRefresh={setRefresh}
                            id={5}
                            showName={false}
                          />
                          <div className="absolute w-full h-full top-0 z-2"></div>
                        </div>
                        <h2 className="mt-124 text-[40px] leading-13 text-slate-gray w-fit text-center ml-10">
                          อาคาร 5 {buildings[5].name}
                        </h2>
                      </div>

                      {/* ตึก 4 & ตึก 6 */}
                      <div className="ml-16 flex flex-col justify-start items-end">
                        {/* ตึก 4 */}
                        <div
                          className="relative top-0 text-center cursor-pointer mr-35 hover:scale-105 active:scale-95 duration-300 ease-in-out transition-[scale] flex flex-col justify-center items-center"
                          onClick={() => handleOnClick(4)}
                        >
                          <Building
                            refresh={refresh}
                            setRefresh={setRefresh}
                            id={4}
                            showName={false}
                          />
                          <h2 className="mt-4 text-[40px] leading-13 text-slate-gray">
                            อาคาร 4 <br /> {buildings[4].name}
                          </h2>
                          <div className="absolute w-full h-full top-0 z-2"></div>
                        </div>
                        {/* ตึก 6 */}
                        <div
                          className="hover:scale-105 active:scale-95 duration-300 ease-in-out transition-[scale]"
                          style={{
                            width: building6Size.width,
                            height: building6Size.height,
                          }}
                        >
                          <div
                            className="text-center cursor-pointer -rotate-90 origin-top-left w-fit h-fit translate-y-[213%]"
                            onClick={() => handleOnClick(6)}
                            ref={building6Ref}
                          >
                            <Building
                              refresh={refresh}
                              setRefresh={setRefresh}
                              id={6}
                              showName={false}
                            />
                            <div className="absolute w-full h-full top-0 z-2"></div>
                          </div>
                          <h2 className="mt-154 text-[40px] leading-13 text-slate-gray w-fit text-center ml-22">
                            อาคาร 6 {buildings[6].name}
                          </h2>
                        </div>
                      </div>

                      {/* ตึก 1 & ตึก 2 & ตึก 3 & ตึก 7 */}
                      <div className="ml-16 flex flex-col">
                        {/* ตึก 1 & ตึก 2 & ตึก 3 */}
                        <div className="flex gap-20">
                          {/* ตึก 3 */}
                          <div
                            className="relative text-center cursor-pointer hover:scale-105 active:scale-95 duration-300 ease-in-out transition-[scale]"
                            onClick={() => handleOnClick(3)}
                          >
                            <div className="px-4">
                              <Building
                                refresh={refresh}
                                setRefresh={setRefresh}
                                id={3}
                                showName={false}
                              />
                            </div>
                            <h2 className="mt-4 text-[40px] leading-13 text-slate-gray text-lg">
                              อาคาร 3 {buildings[3].name}
                            </h2>
                            <div className="absolute w-full h-full top-0 z-2"></div>
                          </div>

                          {/* ตึก 1 & ตึก 2 */}
                          <div className="flex gap-1 items-end bottom-0 hover:mr-0 mr-4 transition-all duration-300">
                            {/* ตึก 2 */}
                            <div
                              className="relative text-center cursor-pointer hover:scale-105 active:scale-95 duration-300 ease-in-out transition-all hover:mr-4"
                              onClick={() => handleOnClick(2)}
                            >
                              <Building
                                refresh={refresh}
                                setRefresh={setRefresh}
                                id={2}
                                showName={false}
                              />
                              <h2 className="mt-4 text-[36px] leading-13 text-slate-gray">
                                อาคาร 2 <br />
                                {buildings[2].name}
                              </h2>
                              <div className="absolute w-full h-full top-0 z-2"></div>
                            </div>

                            {/* ตึก 1 */}
                            <div
                              className="relative text-center cursor-pointer hover:scale-105 active:scale-95 duration-300 ease-in-out transition-all  hover:ml-4"
                              onClick={() => handleOnClick(1)}
                            >
                              <Building
                                refresh={refresh}
                                setRefresh={setRefresh}
                                id={1}
                                showName={false}
                              />
                              <h2 className="mt-4 text-[40px] leading-13 text-slate-gray">
                                อาคาร 1 <br /> {buildings[1].name}
                              </h2>
                              <div className="absolute w-full h-full top-0 z-2"></div>
                            </div>
                          </div>
                        </div>
                        {/* วัน & คาบ */}
                        <div className="mt-40 flex items-center justify-center gap-20 text-gray-600">
                          <div className="flex flex-col justify-end items-end font-semibold">
                            {day ? (
                              <h2 className="text-[93px] drop-shadow-md">
                                {dayEnToThai[day]}
                              </h2>
                            ) : (
                              <div
                                className={`w-100 h-24 rounded-full animate-pulse bg-gray-300 mt-3`}
                              ></div>
                            )}
                            {period ? (
                              <h3 className="text-7xl mt-7 drop-shadow-md">
                                คาบที่ {period}
                              </h3>
                            ) : (
                              <div
                                className={`w-50 h-18 rounded-full animate-pulse bg-gray-300 mt-7`}
                              ></div>
                            )}
                          </div>
                          <span className="border-2 border-gray-500 h-56 mt-5"></span>
                          <div className="flex flex-col justify-center items-start drop-shadow-sm">
                            {day ? (
                              <p className="text-6xl mt-1">
                                {getDate(selectedDate)}{" "}
                                {thaiMonth[getMonth(selectedDate)]}{" "}
                                {getYear(selectedDate) + 543}{" "}
                              </p>
                            ) : (
                              <div
                                className={`w-90 h-15 rounded-full animate-pulse bg-gray-300`}
                              ></div>
                            )}
                            {period ? (
                              <p className="text-6xl mt-8 drop-shadow-sm">
                                ({timeSlots[period].from} -{" "}
                                {timeSlots[period].to} น.)
                              </p>
                            ) : (
                              <div
                                className={`w-110 h-15 rounded-full animate-pulse bg-gray-300 mt-8`}
                              ></div>
                            )}
                          </div>
                        </div>
                        {/* ตึก 7 */}
                        <div
                          className="relative text-center cursor-pointer mt-60 hover:scale-105 active:scale-95 duration-300 ease-in-out transition-[scale] w-fit ml-10"
                          onClick={() => handleOnClick(7)}
                        >
                          <Building
                            refresh={refresh}
                            setRefresh={setRefresh}
                            id={7}
                            showName={false}
                          />
                          <h2 className="mt-4 text-[40px] leading-13 text-slate-gray">
                            อาคาร 7 {buildings[7].name}
                          </h2>
                          <div className="absolute w-full h-full top-0 z-2"></div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="absolute bottom-35 left-30 flex flex-col items-start gap-4 mt-4 mb-2 scale-350 origin-bottom-left">
                        {status.map((item) => (
                          <div
                            key={item.statusEng}
                            className="flex gap-2 justify-start items-center text-slate-gray text-base"
                          >
                            <div
                              className="size-4 rounded-sm shadow-lg"
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="drop-shadow-sm">
                              {item.statusThai}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TransformComponent>
            </div>
          </div>
        </TransformWrapper>
      </div>
    </section>
  );
}
