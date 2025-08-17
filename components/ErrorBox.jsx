import Image from "@node_modules/next/image";
import { Warning } from "@public/assets/icons";
import { useEffect } from "react";
function ErrorBox({
  src,
  Svg,
  alt,
  header,
  message,
  handleOnclick,
  buttonText,
  color,
}) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-8">
      <div className="absolute top-1/2 left-1/2 -translate-1/2 px-3 w-full">
        <div className="bg-white text-white px-8 py-6 rounded-xl z-3 shadow-lg text-center w-full  max-w-[340px] flex flex-col justify-center items-center mx-auto">
          {src && (
            <div>
              <Image src={src} alt={alt} width={36} height={36} />
            </div>
          )}

          {Svg && <Svg className="w-20 h-20 text-red-400" />}

          <h3 className="text-2xl text-gray-700 mt-4 font-semibold">{header}</h3>
          <p className="leading-6 mt-2 text-slate-gray px-3 whitespace-pre-line">
            {message}
          </p>

          {/* <hr className="w-full border border-gray-300 my-5" /> */}
          <button
            className={`text-white bg-gradient-to-r hover:scale-105 active:scale-95 focus:outline-none transition-all duration-150 font-medium text-center shadow-sm cursor-pointer py-2 w-full rounded-2xl mt-6
            ${
              color === "red" &&
              "from-red-400 via-red-500 to-red-600 shadow-red-500/50"
            }
            ${
              color === "green" &&
              "from-green-400 via-green-500 to-green-600 shadow-green-500/50"
            }`}
            onClick={handleOnclick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBox;
