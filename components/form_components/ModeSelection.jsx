import { Arrow_down } from "@public/assets/icons";
import { isBookable } from "@utils/isBookable";

function ModeSelection({ mode, setMode, role, disabledClass, disabledActivity }) {
  return (
    <>
        {/* computer */}
      <div className="flex justify-evenly mb-4 gap-6  relative">
        <button
          disabled={disabledClass}
          className={`cursor-pointer px-3 pb-1 disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap  ${
            mode === "class"
              ? "text-[#466AB0] font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setMode("class")}
        >
          การเรียนการสอน
        </button>
        <button
          disabled={disabledActivity}
          className={`cursor-pointer px-3 pb-1 disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap ${
            mode === "activity"
              ? "text-[#466AB0] font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setMode("activity")}
        >
          กิจกรรม
        </button>

        {/* underline */}
         <span className={`absolute border left-0 -bottom-0.5 border-[#466AB0] rounded-full transition-all duration-300 ${mode === 'activity' ? 'w-[78px] translate-x-[172px]' : 'w-[146px]'}`}></span>
        </div>

        {/* mobile */}
      <div
        className="w-50 relative pb-1.5 text-[#466AB0] font-semibold cursor-pointer hidden overflow-hidden  group mb-4"
        onClick={() => {
          if (disabledActivity || disabledClass) return;
          setMode(`${mode === "activity" ? "class" : "activity"}`)
        }}
      >
        <div
          className={`flex h-full ${
            mode === "activity" && "-translate-x-[200px]"
          } transition-all duration-300`}
        >
          <div
            className={`min-w-50 flex justify-center items-center text-center transition-all duration-300 ${
              mode === "activity" ? "opacity-0" : "opacity-100"
            }`}
          >
            <p className="whitespace-nowrap">การเรียนการสอน</p>
          </div>
            
            {/* ArrowLeft */}
          <button
            disabled={disabledActivity || disabledClass}
            className={`absolute right-0 cursor-pointer transition-all duration-100 p-0.5 disabled:hidden ${
              mode === "activity"
                ? "opacity-0"
                : "opacity-30 hover:opacity-50 active:opacity-50 group-hover:opacity-50 group-active:opacity-50"
            }`}
            onClick={() => setMode("activity")}
          >
            <Arrow_down className="w-5 h-5 text-slate-gray -rotate-90" />
          </button>

            {/* ArrowRight */}
          <button
            disabled={disabledActivity || disabledClass}
            className={`absolute right-36 cursor-pointer transition-all duration-100 p-0.5 disabled:hidden ${
              mode === "activity"
                ? "opacity-30 hover:opacity-50 active:opacity-50 group-hover:opacity-50 group-active:opacity-50"
                : "opacity-0"
            }`}
            onClick={() => setMode("class")}
          >
            <Arrow_down className="w-5 h-5 text-slate-gray rotate-90" />
          </button>

          <div
            className={`min-w-50 flex justify-center items-center text-center transition-all duration-300 ${
              mode === "class" ? "opacity-0" : "opacity-100"
            }`}
          >
            <p className="whitespace-nowrap">กิจกรรม</p>
          </div>
        </div>
        <span
          className={`border absolute bottom-0 left-1/2 -translate-x-1/2 border-[#466AB0] rounded-full transition-all duration-300 ${
            mode === "class" ? "w-40" : "w-24"
          }`}
        ></span>
      </div>
    </>
  );
}

export default ModeSelection;
