import { statusColors } from "@data";

function Room({
  room,
  status,
  name,
  col_span,
  handleOnClick,
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
          className={`relative z-1 bg-gray-200 rounded-md shadow-sm  flex justify-center items-center text-center text-sm w-full h-full p-1 transition-all duration-200 ease-in-out
        ${status === "none" ? "hidden" : ""}
        ${
          status !== "none" && status !== "unavailable"
            ? "cursor-pointer hover:scale-105 active:scale-105 active:shadow-md"
            : ""
        }`}
          style={{ backgroundColor: statusColors[status] }}
          onClick={
            status !== "none" && status !== "unavailable"
              ? () => handleOnClick(room)
              : () => {}
          }
        >
          {showName && name}
        </div>
      )}
    </div>
  );
}

export default Room;
