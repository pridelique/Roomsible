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
  const isAnimatedRef = useRef(false);
  const [showError, setShowError] = useState(false);
  const [animationState, setAnimationState] = useState(false);
  const [zooming, setZooming] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [scale, setScale] = useState(1);
  const [maxScale, setMaxScale] = useState(1);
  const [containerStyle, setcontainerStyle] = useState({
    width: "100%",
    justifyContent: "center",
  });

  const { user } = useContext(SessionContext);

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

  const resetMessage = () => {
    if (window.timeOutZooming) clearTimeout(window.timeOutZooming);
    window.timeOutZooming = setTimeout(() => {
      setZooming(false);
      animateDemo(
        isAnimatedRef,
        zoomPanRef,
        zoomingRef,
        maxScale,
        setAnimationState
      );
    }, 5000);
  };

  const handleZoom = (centerView) => {
    if (fullscreen) centerView(1);
    else centerView(maxScale);
    setZooming(true);
    resetMessage();
    setFullscreen(!fullscreen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (errorBoxRef.current && !errorBoxRef.current.contains(event.target)) {
        setShowError(false);
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
      const maxHeight = window.innerHeight - 270;
      const scaleX = outer.clientWidth / inner.offsetWidth;
      const scaleY =
        Math.min(outer.clientHeight, maxHeight) / (inner.offsetHeight * scaleX);

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
    setTimeout(() => resize(), 10);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [id]);

  useEffect(() => {
    zoomingRef.current = zooming;
  }, [zooming]);

  // Center view on initial load
  useEffect(() => {
    if (centerViewRef.current) {
      centerViewRef.current(maxScale);
      setTimeout(() => {
        animateDemo(
          isAnimatedRef,
          zoomPanRef,
          zoomingRef,
          maxScale,
          setAnimationState
        );
      }, 300);
    }
  }, [scale, maxScale]);

  return (
    <section className="padding-x max-container w-full pt-6">
      <div>
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
          onZoomStop={() => resetMessage()}
          onPanning={() => setZooming(true)}
          onPanningStop={() => resetMessage()}
        >
          {({ centerView }) => {
            centerViewRef.current = centerView;
            return (
              <>
                <h2 className="text-center text-xl md:text-2xl lg:text-3xl text-gray-700 font-semibold">
                  อาคาร {id} {buildings[id]?.name}
                </h2>
                <p className="text-center text-slate-gray mt-2 text-sm md:text-base">
                  เลือกห้องเพื่อดูตารางการใช้งานห้องเรียน
                </p>

                <div
                  className="bg-white rounded-xl max-w-xl mx-auto mt-3 mb-6 relative  shadow-[0_1.5px_6px_0_rgba(0,0,0,0.06),0_6px_18px_0_rgba(0,0,0,0.12),-2px_2px_8px_0_rgba(0,0,0,0.06),2px_2px_8px_0_rgba(0,0,0,0.06)]  overflow-hidden"
                  ref={outerRef}
                >
                  {!zooming && maxScale !== 1 && (
                    <ZoomPanAnimation animationState={animationState} />
                  )}

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
                          handleOnClick={handleFormClick}
                          handleScheduleClick={handleScheduleClick}
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
                <div className="flex justify-center max-w-xl mx-auto mt-3">
                  <StatusTable />
                </div>
              </>
            );
          }}
        </TransformWrapper>
      </div>
      {showError && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-8">
          <div className="absolute top-1/2 left-1/2 -translate-1/2 px-3 w-full">
            <div className="bg-white text-white px-8 pt-8 pb-6 rounded-xl z-3 shadow-lg text-center w-full  max-w-[340px] flex flex-col justify-center items-center mx-auto" ref={errorBoxRef}>
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
    </section>
  );
}

export default BuildingPage;
