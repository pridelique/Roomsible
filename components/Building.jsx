"use client";
import buildings from "@data/buildings";
import Room from "./Room";
import React, { useEffect, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
function Building({ id }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const [maxScale, setMaxScale] = useState(1);
  const [containerStyle, setcontainerStyle] = useState({
    width: "100%",
    justifyContent: "center",
  });

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
          }}
        >
          {({ zoomIn, zoomOut, resetTransform, setTransform, ...rest }) => {
            return (
              <React.Fragment>
                <div
                  className="rounded-lg max-w-xl border border-gray-300 mx-auto my-4 "
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
                            gridTemplateRows: `repeat(${buildings[id]["row"]}, 80px)`,
                          }}
                        >
                          {buildings[id]["rooms"].map((row, rowIndex) => (
                            <React.Fragment key={rowIndex}>
                              {row.map((room, colIndex) => (
                                <Room
                                  key={`${rowIndex}-${colIndex}`}
                                  {...room}
                                />
                              ))}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TransformComponent>
                </div>
                <div className="flex gap-2 justify-center">
                  <button
                    className="bg-gray-100 rounded-xl px-4 py-2 shadow-lg"
                    onClick={() => zoomIn()}
                  >
                    zoom in
                  </button>
                  <button
                    className="bg-gray-100 rounded-xl px-4 py-2 shadow-lg"
                    onClick={() => zoomOut()}
                  >
                    zoom out
                  </button>
                  <button
                    className="bg-gray-100 rounded-xl px-4 py-2 shadow-lg"
                    onClick={() => resetTransform()}
                  >
                    reset
                  </button>
                </div>
              </React.Fragment>
            );
          }}
        </TransformWrapper>
      </div>
    </>
    // <div className="overflow-x-auto border rounded-md p-4">
    //   <div className="gap-2 grid"
    //   style={{ gridTemplateColumns: `repeat(${buildings[id]["col"]}, minmax(80px, 1fr))`, gridTemplateRows: `repeat(${buildings[id]["row"]}, minmax(80px, 1fr))` }}>

    //     {buildings[id]["rooms"].map((row, rowIndex) => (
    //       <React.Fragment key={rowIndex}>
    //         {row.map((room, colIndex) => (
    //           <Room
    //             key={`${rowIndex}-${colIndex}`}
    //             {...room}
    //           />
    //         ))}
    //       </React.Fragment>
    //     ))}
    //   </div>
    // </div>
  );
}

export default Building;
