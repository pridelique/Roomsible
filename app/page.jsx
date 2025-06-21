"use client";
import Building from "@components/Building";
import { buildings } from "@data";
import { useRouter } from "@node_modules/next/navigation";
import { useRef, useEffect, useState, useContext } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { addDays, format, getDay, set } from "date-fns";
import { DateTimeContext } from "../provider/DateTimeProvider";
import { timeSlots } from "@data";
import StatusTable from "@components/StatusTable";
const mapDay = {
  วันจันทร์: 0,
  วันอังคาร: 1,
  วันพุธ: 2,
  วันพฤหัสบดี: 3,
  วันศุกร์: 4,
};

export default function HomePage() {
  const router = useRouter();
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const building5Ref = useRef(null);
  const building6Ref = useRef(null);
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
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;
      const scaleX = outer.clientWidth / inner.offsetWidth;
      const scaleY = outer.clientHeight / inner.offsetHeight;
      setScreenHeight(window.innerHeight);
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
      setLoading(false);
    }, 300);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="padding-x max-container w-full pt-6">
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
          <div className="border-3 border-gray-100 border-t-3 border-t-red-400 rounded-full p-6 animate-spin shadow-inner"></div>
        </div>
      )}
      <h2 className="text-center text-xl md:text-2xl lg:text-3xl text-gray-700 font-semibold">
        แผนผังโรงเรียนสตรีวิทยา
      </h2>
      <p className="text-center text-slate-gray mt-2 text-sm md:text-base mb-4">
        เลือกตึกที่ต้องการดูแผนผังอาคาร
      </p>
      <div className="relative w-full h-full ">
        <TransformWrapper>
          <div
            className="w-full"
            ref={outerRef}
            style={{ height: screenHeight - 270 }}
          >
            <div className="flex justify-center items-start rounded-lg overflow-hidden shadow-[0_1.5px_6px_0_rgba(0,0,0,0.06),0_6px_18px_0_rgba(0,0,0,0.12),-2px_2px_8px_0_rgba(0,0,0,0.06),2px_2px_8px_0_rgba(0,0,0,0.06)] w-fit h-fit mx-auto">
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
                      className="flex justify-start w-fit h-fit p-24 pt-36 origin-top-left"
                      style={{ transform: `scale(${scale})` }}
                      ref={innerRef}
                    >
                      {/* ตึก 5 */}
                      <div
                        className="hover:scale-105 duration-300 ease-in-out transition-all"
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
                          <Building id={5} showName={false} />
                          <div className="absolute w-full h-full top-0 z-2"></div>
                        </div>
                        <h2 className="mt-124 text-[40px] leading-13 text-slate-gray w-fit text-center ml-3.5">
                          อาคาร 5 {buildings[5].name}
                        </h2>
                      </div>

                      {/* ตึก 4 & ตึก 6 */}
                      <div className="ml-16 flex flex-col justify-start items-end">
                        {/* ตึก 4 */}
                        <div
                          className="relative top-0 text-center cursor-pointer mr-35 hover:scale-105 duration-300 ease-in-out transition-all flex flex-col justify-center items-center"
                          onClick={() => handleOnClick(4)}
                        >
                          <Building id={4} showName={false} />
                          <h2 className="mt-4 text-[40px] leading-13 text-slate-gray">
                            อาคาร 4 <br /> {buildings[4].name}
                          </h2>
                          <div className="absolute w-full h-full top-0 z-2"></div>
                        </div>
                        {/* ตึก 6 */}
                        <div
                          className="hover:scale-105 duration-300 ease-in-out transition-all"
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
                            <Building id={6} showName={false} />
                            <div className="absolute w-full h-full top-0 z-2"></div>
                          </div>
                          <h2 className="mt-154 text-[40px] leading-13 text-slate-gray w-fit text-center ml-16.5">
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
                            className="relative text-center cursor-pointer hover:scale-105 duration-300 ease-in-out transition-all"
                            onClick={() => handleOnClick(3)}
                          >
                            <div className="px-4">
                              <Building id={3} showName={false} />
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
                              className="relative text-center cursor-pointer hover:scale-105 duration-300 ease-in-out transition-all hover:mr-4"
                              onClick={() => handleOnClick(2)}
                            >
                              <Building id={2} showName={false} />
                              <h2 className="mt-4 text-[36px] leading-13 text-slate-gray">
                                อาคาร 2 <br />
                                {buildings[2].name}
                              </h2>
                              <div className="absolute w-full h-full top-0 z-2"></div>
                            </div>

                            {/* ตึก 1 */}
                            <div
                              className="relative text-center cursor-pointer hover:scale-105 duration-300 ease-in-out transition-all  hover:ml-4"
                              onClick={() => handleOnClick(1)}
                            >
                              <Building id={1} showName={false} />
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
                            <h2 className="text-[93px]">{day}</h2>
                            <h3 className="text-7xl mt-7">คาบที่ {period}</h3>
                          </div>
                          <span className="border-2 border-gray-500 h-56 mt-5"></span>
                          <div className="flex flex-col justify-center items-start">
                            <p className="text-6xl mt-1">
                              {format(selectedDate, "dd-MM-yyyy")}
                            </p>
                            <p className="text-6xl mt-8">
                              ({timeSlots[period].from} - {timeSlots[period].to}{" "}
                              น.)
                            </p>
                          </div>
                        </div>
                        {/* ตึก 7 */}
                        <div
                          className="relative text-center cursor-pointer mt-60 hover:scale-105 duration-300 ease-in-out transition-all w-fit ml-10"
                          onClick={() => handleOnClick(7)}
                        >
                          <Building id={7} showName={false} />
                          <h2 className="mt-4 text-[40px] leading-13 text-slate-gray">
                            อาคาร 7 {buildings[7].name}
                          </h2>
                          <div className="absolute w-full h-full top-0 z-2"></div>
                        </div>
                      </div>
                      {/* วัน คาบ */}
                      {/* <div className="absolute p-20 top-200 left-272 flex items-center justify-center gap-20 text-gray-600">
                      <div className="flex flex-col justify-end items-end font-semibold">
                        <h2 className="text-8xl">{day}</h2>
                        <h3 className="text-7xl mt-7">คาบที่ {period}</h3>
                      </div>
                      <span className="border-2 border-gray-500 h-56 mt-5"></span>
                      <div className="flex flex-col justify-center items-start">
                        <p className="text-6xl mt-1">
                          {format(selectedDate, "dd-MM-yyyy")}
                        </p>
                        <p className="text-6xl mt-8">
                          ({timeSlots[period].from} - {timeSlots[period].to} น.)
                        </p>
                      </div>
                    </div> */}
                    </div>
                  </div>
                </div>
              </TransformComponent>
            </div>
            <div className="flex justify-center items-center mt-5">
              <StatusTable />
            </div>
          </div>
        </TransformWrapper>
      </div>
    </section>
  );
}
