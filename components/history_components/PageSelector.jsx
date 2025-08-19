import { Arrow_down } from "@public/assets/icons";

function PageSelector({
  selectedPage,
  setSelectedPage,
  totalPages,
  totalBookings,
  bookingsLoading,
}) {
  return (
    <div className="pt-4 px-4 min-[400px]:px-8 text-slate-gray/80 flex items-center justify-between max-[550px]:flex-col max-[550px]:gap-0 gap-2 w-full">
      {bookingsLoading ? (
        <p className="h-8 items-center flex">กำลังโหลดประวัติการจอง...</p>
      ) : (
        <>
          <p className="max-[400px]:text-sm text-center">
            รายการที่ {Math.max(selectedPage * 5 - 4, 0)} -{" "}
            {Math.min(selectedPage * 5, totalBookings)} จากทั้งหมด{" "}
            {totalBookings} รายการ
          </p>
          <div className="w-36 flex justify-between items-center gap-2">
            <button
              className="p-1 hover:bg-gray-100 active:bg-gray-100 rounded-lg cursor-pointer disabled:cursor-default disabled:opacity-0"
              onClick={() =>
                setTimeout(() => setSelectedPage(selectedPage - 1), 0)
              }
              disabled={selectedPage === 1 || totalPages === 0}
            >
              <Arrow_down className="size-6 text-gray-400 rotate-90" />
            </button>
            <div>
              <p>
                {selectedPage} OF {totalPages}
              </p>
            </div>
            <button
              className="p-1 hover:bg-gray-100 active:bg-gray-100 rounded-lg cursor-pointer disabled:cursor-default disabled:opacity-0"
              onClick={() =>
                setTimeout(() => setSelectedPage(selectedPage + 1), 0)
              }
              disabled={selectedPage === totalPages}
            >
              <Arrow_down className="size-6 text-gray-400 -rotate-90" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PageSelector;
