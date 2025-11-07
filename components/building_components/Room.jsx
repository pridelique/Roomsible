import { statusColors } from "@data";
import { Schedule } from "@public/assets/icons";

function Room({
  status,
  name,
  display,
  col_span,
  handleOnClick,
  // handleScheduleClick,
  showName,
  loading = false,
}) {
  // console.log(room, status);

  return (
    <div
      style={{ gridColumn: `span ${col_span} / span ${col_span}` }}
      className="w-full"
    >
      {loading ? (
        <div
          className={`relative z-1 bg-gray-200 rounded-md shadow-sm  flex justify-center items-center text-center text-sm w-full h-full p-1 transition-all duration-200 ease-in-out animate-pulse
        ${status === "none" ? "hidden" : ""}`}
        >
          {/* {showName && name} */}
        </div>
      ) : (
        <div
          className={`relative z-1 bg-gray-200 rounded-md shadow-sm  flex justify-center items-center text-center text-sm w-full h-full p-1 transition-all duration-200 ease-in-out whitespace-pre-line
        ${status === "none" ? "hidden" : ""}
        ${
          (status !== "none" && status !== "unavailable")
            ? "cursor-pointer hover:scale-105 active:scale-95 active:shadow-md"
            : ""
        }`}
          style={{ backgroundColor: statusColors[status] }}
          onClick={
            (status !== "none" && status !== "unavailable")
              ? () => handleOnClick(name, status)
              : () => {}
          }
        >
          {showName && display}
          {/* {showName && status !== "none" && status !== "unavailable" && (
            <button 
              className="absolute bottom-[6px] right-[6px] cursor-pointer hover:scale-110 active:scale-110 active:shadow-md transition-all duration-200 ease-in-out"
              onClick={(e) => {
                e.stopPropagation();
                handleScheduleClick(room);
              }}
            >
              <Schedule className="w-4 h-4 text-gray-700" />
            </button>
          )} */}
        </div>
      )}
    </div>
  );
}

export default Room;
