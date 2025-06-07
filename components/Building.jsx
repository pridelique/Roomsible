"use client";
import buildings from "@data/buildings";
import Room from "./Room";
import React, { useEffect, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useRouter } from "@node_modules/next/navigation";
import Image from "@node_modules/next/image";
import { zoom_in, zoom_out } from "@public/assets/icons";
import { status } from "@data";
function Building({ id }) {
  const router = useRouter();
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
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
    window.addEventListener("resize", resize);
    setLoading(false);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      {loading && (
        <div className="w-full flex justify-center items-center">
          <div className="border-6 border-gray-100 border-t-6 border-t-red-400 rounded-full p-6 animate-spin mt-20"></div>
        </div>
      )}
      <div className={`${loading ? "opacity-0" : "opacity-100"}`}>
        <TransformWrapper
          limitToBounds={true}
          panning={{
            lockAxisY: true,
          }}
          maxScale={maxScale}
          centerZoomedOut={true}
          centerOnInit={true}
          onZoom={(ref) => {
            ref.centerView();
            if (ref.state.scale === maxScale) setFullscreen(true);
            if (ref.state.scale === 1) setFullscreen(false);
          }}
        >
          {({ centerView }) => {
            return (
              <React.Fragment>
                <h2 className="text-center text-xl md:text-2xl lg:text-3xl text-gray-700">
                  อาคาร {id} {buildings[id]["name"]}
                </h2>
                <p className="text-center text-slate-gray mt-1 text-sm md:text-base lg:text-lg">
                  เลือกห้องที่ว่างอยู่เพื่อทำการจอง
                </p>
                <div
                  className="rounded-lg max-w-xl border border-gray-300 mx-auto relative mt-4"
                  ref={outerRef}
                >
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
                  {maxScale != 1 && (
                    <div
                      className="absolute bottom-0 right-0 rounded-full hover:bg-gray-200 opacity-40 p-2 m-2 flex justify-center items-center object-cover cursor-pointer"
                      onClick={() => handleZoom(centerView)}
                    >
                      <Image
                        src={fullscreen ? zoom_in : zoom_out}
                        alt="zoom"
                        width={20}
                        height={20}
                        draggable={false}
                        className="select-none"
                      />
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          }}
        </TransformWrapper>
      </div>
      <div className="mt-3 grid grid-cols-2 max-w-xl mx-auto">
        {status.map((item) => (
          <div className="flex gap-2 justify-start items-center text-slate-gray" key={item.statusEng}>
            <div
              className="size-4 rounded-sm shadow-lg"
              style={{ backgroundColor: item.color }}
            ></div>
            <span>{item.statusThai}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Building;
