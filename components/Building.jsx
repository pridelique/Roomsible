"use client";
import buildings from "@data/buildings";
import Room from "./Room";
import React, { useEffect, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useRouter } from "@node_modules/next/navigation";
import Image from "@node_modules/next/image";
import { hand_zoom, zoom_in, zoom_out } from "@public/assets/icons";
import { status } from "@data";
import { set } from "mongoose";
function Building({ id }) {
  const router = useRouter();
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const buttonRef = useRef(null);
  const centerViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [zooming, setZooming] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [scale, setScale] = useState(1);
  const [maxScale, setMaxScale] = useState(1);
  const [containerStyle, setcontainerStyle] = useState({
    width: "100%",
    justifyContent: "center",
  });

  const handleOnClick = (roomNumber) => {
    router.push(`/building/${id}/schedule?roomNumber=${roomNumber}`);
  };

  const handleZoom = (centerView) => {
    if (fullscreen) centerView(1);
    else centerView(maxScale);
    if(window.timeOutZooming) clearTimeout(window.timeOutZooming);
    setZooming(true);
    window.timeOutZooming = setTimeout(() => {
      setZooming(false);
    },5000)

    setFullscreen(!fullscreen);
  };

  useEffect(() => {
    const resize = () => {
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;

      const scaleX = outer.clientWidth / inner.offsetWidth;
      const scaleY = outer.clientHeight / (inner.offsetHeight * scaleX);

      setScale(Math.min(1, scaleX));
      setMaxScale(Math.max(1, scaleY));
      if (Math.min(1, scaleX) === 1)
        setcontainerStyle({
          width: outer.clientWidth,
          justifyContent: "center",
        });
      else
        setcontainerStyle({
          width: inner.offsetWidth * scaleX,
          justifyContent: "start",
        });
    };
    resize();
    setTimeout(() => resize(), 10)
    setLoading(false);    
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [id]);

  useEffect(() => {
    if (!loading && centerViewRef.current) {
      centerViewRef.current(maxScale);
    }
  },[scale, maxScale]);

  return (
    <>
      {loading && (
        <div className="w-full flex justify-center items-center">
          <div className="border-6 border-gray-100 border-t-6 border-t-red-400 rounded-full p-6 animate-spin mt-20"></div>
        </div>
      )}
      <div className={`${loading ? "opacity-0" : "opacity-100"}`}>
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
          onZoomStop={() => {
            if (window.timeOutZooming) clearTimeout(window.timeOutZooming);
            window.timeOutZooming = setTimeout(() => {
              setZooming(false);
            }, 5000);
          }}
        >
          {({ centerView }) => {
            centerViewRef.current = centerView;
            return (
              <React.Fragment>
                <h2 className="text-center text-2xl md:text-3xl lg:text-4xl text-gray-700 font-semibold">
                  อาคาร {id} {buildings[id]["name"]}
                </h2>
                <p className="text-center text-slate-gray mt-2 text-sm md:text-base">
                  เลือกห้องที่ว่างอยู่เพื่อทำการจอง
                </p>
                <div
                  className="rounded-lg max-w-xl border border-gray-300 mx-auto relative mt-4"
                  ref={outerRef}
                >
                  {!zooming && (
                    <div className="absolute top-1/2 left-1/2 -translate-1/2 z-9 animate-pulse w-full text-center text-slate-gray text-lg sm:text-xl flex gap-2 justify-center items-center">
                      <Image
                        src={hand_zoom}
                        alt="hand zoom"
                        width={24}
                        height={24}
                        draggable={false}
                        className="select-none"
                      />
                      <p>ลากหรือใช้ปุ่มซูมเพื่อดูแผนผังอาคาร</p>
                    </div>
                  )}

                  <TransformComponent>
                    <div className="flex" style={containerStyle}>
                      <div
                        className="origin-left"
                        ref={innerRef}
                        style={{ transform: `scale(${scale})` }}
                      >
                        <div
                          className="gap-1 grid p-4"
                          style={{
                            gridTemplateColumns: `repeat(${buildings[id]["col"]}, 80px)`,
                            gridTemplateRows: `repeat(${buildings[id]["row"]}, 100px)`,
                          }}
                        >
                          {buildings[id]["rooms"].map((row, rowIndex) => (
                            <React.Fragment key={rowIndex}>
                              {row.map((room, colIndex) => (
                                <Room
                                  key={`${rowIndex}-${colIndex}`}
                                  {...room}
                                  onClick={handleOnClick}
                                />
                              ))}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TransformComponent>
                  <button
                    className={`absolute bottom-0 right-0 rounded-full hover:bg-gray-200 opacity-40 p-2 m-2  object-cover cursor-pointer justify-center items-center ${
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
              </React.Fragment>
            );
          }}
        </TransformWrapper>
        <div className="flex justify-start max-w-xl mx-auto mt-4">
          <div className="grid grid-cols-3 max-w-xl w-fit pl-5 gap-x-2 sm:gap-x-3">
            {status.map((item) => (
              <div
                className="flex gap-2 justify-start items-center text-slate-gray text-sm md:text-base"
                key={item.statusEng}
              >
                <div
                  className="size-3 sm:size-4 rounded-sm shadow-lg"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span>{item.statusThai}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Building;
