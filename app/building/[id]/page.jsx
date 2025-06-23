"use client";
import buildings from "@data/buildings";
import React, { useEffect, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useRouter } from "@node_modules/next/navigation";
import Image from "@node_modules/next/image";
import { zoom_in, zoom_out } from "@public/assets/icons";
import Building from "@components/building_components/Building";
import StatusTable from "@components/building_components/StatusTable";
import ZoomPanAnimation from "@components/building_components/ZoomPanAnimation";
import { animateDemo } from "@utils/animateDemo";

function BuildingPage({ params }) {
  const { id } = React.use(params);
  const router = useRouter();
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const buttonRef = useRef(null);
  const zoomPanRef = useRef(null);
  const zoomingRef = useRef(null);
  const centerViewRef = useRef(null);
  const isAnimatedRef = useRef(false);
  const [animationState, setAnimationState] = useState(false);
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

  const resetMessage = () => {
    if (window.timeOutZooming) clearTimeout(window.timeOutZooming);
    window.timeOutZooming = setTimeout(() => {
      setZooming(false);
      animateDemo(isAnimatedRef, zoomPanRef, zoomingRef, maxScale, setAnimationState)
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
    setLoading(false);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [id]);

  useEffect(() => {
    zoomingRef.current = zooming;
  }, [zooming]);

  useEffect(() => {
    if (!loading && centerViewRef.current) {
      centerViewRef.current(maxScale);
      setTimeout(() => {
        animateDemo(isAnimatedRef, zoomPanRef, zoomingRef, maxScale, setAnimationState);
      }, 300);
    }
  }, [scale, maxScale]);

  return (
    <section className="padding-x max-container w-full pt-6">
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
          <div className="border-3 border-gray-100 border-t-3 border-t-red-400 rounded-full p-6 animate-spin shadow-inner"></div>
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
                  className="rounded-xl max-w-xl mx-auto mt-3 mb-6 relative  shadow-[0_1.5px_6px_0_rgba(0,0,0,0.06),0_6px_18px_0_rgba(0,0,0,0.12),-2px_2px_8px_0_rgba(0,0,0,0.06),2px_2px_8px_0_rgba(0,0,0,0.06)]  overflow-hidden"
                  ref={outerRef}
                >
                  {!zooming && maxScale !== 1 && (
                    <ZoomPanAnimation animationState={animationState}/>
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
                        <Building id={id} handleOnClick={handleOnClick} />
                      </div>
                    </div>
                  </TransformComponent>
                  <button
                    className={`absolute bottom-0 right-0 rounded-full hover:bg-gray-200 opacity-40 p-2 m-2 object-cover cursor-pointer justify-center items-center ${
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
    </section>
  );
}

export default BuildingPage;
