import Image from "@node_modules/next/image";
import { hand, right_arrow } from "@public/assets/images";

function ZoomPanAnimation({ animationState }) {
  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-1/2 flex gap-2 justify-center z-4 items-center w-full whitespace-nowrap opacity-50`}
    >
      {/* hand */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-1/2 transition-transform duration-900 ease-in-out w-fit opacity-0 ${
          animationState === "right" ? "translate-x-2" : ""
        } ${
          animationState === "right" || animationState === "left"
            ? "opacity-100"
            : "opacity-0"
        }`}
      >
        <Image
          src={hand}
          alt="hand"
          width={100}
          height={100}
          draggable={false}
          className="select-none"
        />
      </div>

      {/* zoom */}
      <div
        className={`relative w-fit opacity-0  ${
          animationState === "zoom in" || animationState === "zoom out"
            ? "opacity-100"
            : ""
        }`}
      >
        <div
          className={`transition-size duration-900 ${
            animationState === "zoom out" ? "size-30" : "size-25"
          }`}
        >
          <Image
            src={right_arrow}
            alt="right arrow"
            width={50}
            height={50}
            className={`absolute top-0 right-0 ${
              animationState === "zoom out" ? "-rotate-45" : "rotate-135"
            }`}
          />
          <Image
            src={right_arrow}
            alt="right arrow"
            width={50}
            height={50}
            className={`absolute bottom-0 left-0 ${
              animationState === "zoom out" ? "rotate-135" : "-rotate-45"
            }`}
          />
        </div>
      </div>

      <div
        className={`absolute top-1/2 left-1/2 -translate-1/2 flex gap-2 justify-center items-center w-fit whitespace-nowrap transition-all duration-900 ease-in-out ${
          animationState === "right" ? "translate-x-2" : ""
        }`}
      ></div>
    </div>
  );
}

export default ZoomPanAnimation;
