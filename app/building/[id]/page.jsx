"use client";
import buildings from "@data/buildings";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useRouter } from "@node_modules/next/navigation";
import Image from "@node_modules/next/image";
import { Warning, zoom_in, zoom_out } from "@public/assets/icons";
import Building from "@components/building_components/Building";
import StatusTable from "@components/building_components/StatusTable";
import ZoomPanAnimation from "@components/building_components/ZoomPanAnimation";
import { animateDemo } from "@utils/animateDemo";
import { DateTimeContext } from "@provider/DateTimeProvider";
import { SessionContext } from "@provider/SessionProvider";
import ErrorBox from "@components/ErrorBox";
import BookingCard from "@components/building_components/BookingCard";
import { InfoIcon } from "@public/assets/icons";

function BuildingPage({ params }) {
  const { id } = React.use(params);
  const { day, period } = useContext(DateTimeContext);
  const router = useRouter();
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const buttonRef = useRef(null);
  const zoomPanRef = useRef(null);
  const zoomingRef = useRef(null);
  const centerViewRef = useRef(null);
  const errorBoxRef = useRef(null);
  const resizeRef = useRef(null);
  const tooltipRef = useRef(null);
  const isAnimatedRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showError, setShowError] = useState(false);
  const [animationState, setAnimationState] = useState(false);
  const [zooming, setZooming] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [maxScale, setMaxScale] = useState(1);
  const [containerStyle, setcontainerStyle] = useState({
    width: "100%",
    justifyContent: "center",
  });
  const [bookingCard, setBookingCard] = useState(null);
  const { user } = useContext(SessionContext);

  const handleOnClick = (room, status) => {
    setBookingCard({ room, day, period, status });
  };

  const handleFormClick = (room) => {
    if (user && user !== "loading") {
      router.push(
        `/form?building=${id}&room=${room}&day=${day}&period=${period}`
      );
    } else {
      setShowError(true);
    }
  };

  const handleScheduleClick = (room) => {
    router.push(`/building/${id}/schedule?room=${room}`);
  };

  // const resetMessage = () => {
  //   if (window.timeOutZooming) clearTimeout(window.timeOutZooming);
  //   window.timeOutZooming = setTimeout(() => {
  //     setZooming(false);
  //     animateDemo(
  //       isAnimatedRef,
  //       zoomPanRef,
  //       zoomingRef,
  //       maxScale,
  //       setAnimationState
  //     );
  //   }, 5000);
  // };

  const handleZoom = (centerView) => {
    if (fullscreen) centerView(1);
    else centerView(maxScale);
    setZooming(true);
    // resetMessage();
    setFullscreen(!fullscreen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (errorBoxRef.current && !errorBoxRef.current.contains(event.target)) {
        setShowTooltip(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const resize = () => {
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;
      const scaleX = outer.clientWidth / inner.offsetWidth;
      const maxHeight = Math.max(
        inner.offsetHeight * scaleX,
        window.innerHeight - 270
      );
      const scaleY =
        Math.min(outer.clientHeight, maxHeight) / (inner.offsetHeight * scaleX);

      console.log(scaleX, scale);

      setScale(Math.min(1, scaleX));
      setMaxScale(Math.max(1, scaleY));
      if (Math.min(1, scaleX) === 1)
        setcontainerStyle({
          width: outer.clientWidth,
          justifyContent: "center",
          maxHeight: maxHeight,
        });
      else
        setcontainerStyle({
          width: inner.offsetWidth * scaleX,
          justifyContent: "start",
          maxHeight: maxHeight,
        });
    };
    resize();
    setTimeout(() => resize(), 0);
    setTimeout(() => {
      setLoading(false);
    }, 10);
    window.addEventListener("resize", resize);
    resizeRef.current = setInterval(() => resize(), 1000);
    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(resizeRef.current);
    };
  }, [id]);

  useEffect(() => {
    zoomingRef.current = zooming;
  }, [zooming]);

  // Center view on initial load
  // useEffect(() => {
  //   if (centerViewRef.current) {
  //     centerViewRef.current(maxScale);
  //     // setTimeout(() => {
  //     //   animateDemo(
  //     //     isAnimatedRef,
  //     //     zoomPanRef,
  //     //     zoomingRef,
  //     //     maxScale,
  //     //     setAnimationState
  //     //   );
  //     // }, 300);
  //   }
  // }, [scale, maxScale]);

  // useEffect(() => {
  //   setBookingCard({
  //     room: '1303',
  //     day: 'wednesday',
  //     period: 3,
  //     buildingId: id,
  //     status: 'available',
  //     setBookingCard,
  //     handleFormClick,
  //     handleScheduleClick,
  //   });
  // }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setShowTooltip(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="px-2 max-container w-full pt-4">
      <h2 className="text-center text-[24px] md:text-[26px] lg:text-3xl text-gray-700 font-semibold">
        อาคาร {id} {buildings[id]?.name}
      </h2>
      <p className="text-center text-slate-gray mt-[2px] text-sm md:text-base">
        เลือกห้องเพื่อดำเนินการ
      </p>
      <div className={`relative mt-3 w-fit mx-auto ${loading && "opacity-0"}`}>
        <div
          className="absolute top-3 left-3 w-fit h-fit flex justify-center items-start z-3"
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
          {showTooltip && (
            <div className="relative ml-2 bg-white border border-gray-200 rounded-lg shadow px-4 py-3 text-sm text-gray-600 z-50 whitespace-nowrap">
              <p className="font-semibold mb-2">วิธีใช้งาน</p>
              <ul className="list-disc list-inside space-y-1">
                <li>คลิกที่ห้องเพื่อดูรายละเอียด</li>
                <li>สีของห้องแสดงสถานะการใช้งาน</li>
                <li>สามารถเลื่อนและซูมแผนผังได้</li>
              </ul>
            </div>
          )}
        </div>
        <TransformWrapper
          panning={{
            lockAxisY: true,
          }}
          maxScale={maxScale}
          centerZoomedOut={true}
          centerOnInit={true}
          onZoom={(ref) => {
            ref.centerView();
            setZooming(true);
            if (ref.state.scale === maxScale) setFullscreen(true);
            if (ref.state.scale === 1) setFullscreen(false);
          }}
          onInit={(ref) => {
            zoomPanRef.current = ref;
          }}
          // onZoomStop={() => resetMessage()}
          onPanning={() => setZooming(true)}
          // onPanningStop={() => resetMessage()}
        >
          {({ centerView }) => {
            centerViewRef.current = centerView;
            return (
              <>
                <div className="bg-white rounded-xl max-w-xl mx-auto mb-3 relative shadow-[0_1.5px_6px_0_rgba(0,0,0,0.06),0_6px_18px_0_rgba(0,0,0,0.12),-2px_2px_8px_0_rgba(0,0,0,0.06),2px_2px_8px_0_rgba(0,0,0,0.06)]">
                  <div
                    className="relative overflow-hidden"
                    ref={outerRef}
                  >
                    {/* {!zooming && maxScale !== 1 && (
                    <ZoomPanAnimation animationState={animationState} />
                  )} */}

                    <TransformComponent>
                      <div
                        className="flex cursor-grab active:cursor-grabbing max-h-[500px] justify-center items-center"
                        style={containerStyle}
                      >
                        <div
                          className="origin-left p-10 h-fit"
                          ref={innerRef}
                          style={{ transform: `scale(${scale})` }}
                        >
                          <Building
                            id={id}
                            handleOnClick={handleOnClick}
                            // handleOnClick={handleFormClick}
                            // handleScheduleClick={handleScheduleClick}
                          />
                        </div>
                      </div>
                    </TransformComponent>
                    <button
                      className={`absolute bottom-0 right-0 rounded-full hover:bg-gray-300 active:bg-gray-400 opacity-40 p-2 m-2 object-cover cursor-pointer justify-center items-center ${
                        maxScale === 1 ? "hidden" : "flex"
                      } `}
                      onClick={() => handleZoom(centerView)}
                      ref={buttonRef}
                    >
                      <Image
                        src={fullscreen ? zoom_in : zoom_out}
                        alt="zoom"
                        width={20}
                        height={20}
                        draggable={false}
                        className="select-none"
                      />
                    </button>
                  </div>
                  <div className="border border-gray-200 w-11/12 mx-auto"></div>
                  <div className="flex justify-center max-w-xl mx-auto pt-4 bg-white w-fit px-4">
                    <StatusTable />
                  </div>
                </div>
              </>
            );
          }}
        </TransformWrapper>
      </div>
      {showError && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-8">
          <div className="absolute top-1/2 left-1/2 -translate-1/2 px-3 w-full">
            <div
              className="bg-white text-white px-8 pt-8 pb-6 rounded-xl z-3 shadow-lg text-center w-full  max-w-[340px] flex flex-col justify-center items-center mx-auto"
              ref={errorBoxRef}
            >
              <Warning className="w-16 h-16 text-red-400" />

              <h3 className="text-xl text-gray-700 mt-3 font-semibold">
                ไม่สามารถจองห้อง
              </h3>
              <p className="leading-6 mt-2 text-slate-gray px-3 whitespace-pre-line">
                กรุณาเข้าสู่ระบบเพื่อจองห้อง
              </p>

              {/* <hr className="w-full border border-gray-300 my-5" /> */}
              <button
                className={`text-white bg-gradient-to-r hover:bg-gradient-to-br focus:outline-none font-medium text-center shadow-sm cursor-pointer py-2 w-full rounded-2xl mt-6 from-red-400 via-red-500 to-red-600 shadow-red-500/50`}
                onClick={() => router.push("/login")}
              >
                เข้าสู่ระบบ
              </button>
            </div>
          </div>
        </div>
      )}
      {bookingCard && (
        <BookingCard
          {...bookingCard}
          handleFormClick={handleFormClick}
          handleScheduleClick={handleScheduleClick}
          buildingId={id}
          setBookingCard={setBookingCard}
        />
      )}
    </section>
  );
}

export default BuildingPage;
