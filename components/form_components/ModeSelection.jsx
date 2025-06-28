import { Arrow_down } from "@public/assets/icons";

function ModeSelection({ mode, setMode }) {
  return (
    <>
        {/* computer */}
      <div className="flex justify-evenly mb-4 gap-6  max-[450px]:hidden relative">
        <span
          className={`cursor-pointer px-3 pb-1 ${
            mode === "class"
              ? "text-[#466AB0] font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setMode("class")}
        >
          การเรียนการสอน
        </span>
        <span
          className={`cursor-pointer px-3 pb-1 ${
            mode === "activity"
              ? "text-[#466AB0] font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setMode("activity")}
        >
          กิจกรรม
        </span>

        {/* underline */}
         <span className={`absolute border left-0 -bottom-0.5 border-[#466AB0] rounded-full transition-all duration-300 ${mode === 'activity' ? 'w-[88px] translate-x-[181px]' : 'w-[158px]'}`}></span>
        </div>

        {/* mobile */}
      <div
        className="w-50 relative pb-1.5 text-[#466AB0] font-semibold cursor-pointer hidden overflow-hidden max-[450px]:flex group mb-4"
        onClick={() => setMode(`${mode === "activity" ? "class" : "activity"}`)}
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
            className={`absolute right-0 cursor-pointer transition-all duration-100 p-0.5 ${
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
            className={`absolute right-36 cursor-pointer transition-all duration-100 p-0.5 ${
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
