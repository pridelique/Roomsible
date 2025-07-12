"use client";
import ErrorBox from "@components/ErrorBox";
import DateFilter from "@components/history_components/DateFilter";
import OptionButton from "@components/history_components/OptionButton";
import PageSelector from "@components/history_components/PageSelector";
import StatusTabs from "@components/history_components/StatusTabs";
import Loading from "@components/Loading";
import { timeSlots } from "@data";
import { bookingDemo } from "@data/bookingDemo";
import { Settings } from "@node_modules/lucide-react";
import { useRouter } from "@node_modules/next/navigation";
import { SessionContext } from "@provider/SessionProvider";
import { date, Warning } from "@public/assets/icons";
import { Guest_Profile } from "@public/assets/images";
import { supabase } from "@utils/supabase";
import { useState, useEffect, useRef, useContext } from "react";

const thStatus = {
  all: "ทั้งหมด",
  booked: "จองแล้ว",
  confirmed: "ยืนยันแล้ว",
  canceled: "ยกเลิก",
};

const dateList = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"];
const statusList = ["all", "confirmed", "booked", "canceled"];

function HistoryPage() {
  const [bookings, setBookings] = useState(bookingDemo);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("today");
  const [totalPages, setTotalPages] = useState(
    Math.ceil(bookingDemo.length / 5)
  );
  const [totalBookings, setTotalBookings] = useState(bookingDemo.length);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPage, setSelectedPage] = useState(totalBookings == 0 ? 0 : 1);
  const { user } = useContext(SessionContext);
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();

  const cancelBooking = (id) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: "canceled" } : booking
      )
    );
  };

  const dateFilterFuction = (booking) => {
    let todayIndex = new Date().getDay() - 1;
    if (todayIndex > 4) todayIndex = 0;
    if (dateFilter === "all") return true;
    else if (dateFilter === "today")
      return dateList.indexOf(booking.date) === todayIndex;
    else if (dateFilter === "fromToday")
      return dateList.indexOf(booking.date) >= todayIndex;
    return booking.date === selectedDate;
  };

  useEffect(() => {
    const totalBookings = bookings
      .filter((booking) => dateFilterFuction(booking))
      .filter(
        (booking) => statusFilter === "all" || booking.status === statusFilter
      ).length;
    if (totalBookings === 0) setSelectedPage(0);
    else setSelectedPage(1);
    setTotalBookings(totalBookings);
    setTotalPages(Math.ceil(totalBookings / 5));
    if (dateFilter !== "options") setSelectedDate("");
    console.log("Bookings updated:", dateFilter);
  }, [statusFilter, dateFilter, selectedDate, bookings]);

  useEffect(() => {

    console.log(user);
    
    const getUserDetails = async () => {
      if (!user) return;
      console.log(user);
      
      const { data, error } = await 
      supabase
      .from("users")
      .select('firstname, lastname, classroom, no')
      .eq('user_id', user?.id)
      .single();
      if (error) {
        console.log("Error fetching user details:", error);
        return;
      }
      setUserDetails(data);
    }
    getUserDetails();
  }, [user]);

  if (user === 'loading') return (
    <Loading/>
  )

  return (
    <div>
      {user ? (
        <div className="relative mx-auto max-w-4xl ">
          <img
            src="/assets/images/historyImage.jpg"
            className="w-full h-64 object-cover"
          />
          <div className="flex items-center relative">
            <div className="absolute left-1/2 -translate-x-1/2 md:left-50 bottom-4 md:-bottom-4 translate-y-1/2 w-49.5 h-49.5 rounded-full flex items-center justify-center text-slate-gray/50 z-3">
              <Guest_Profile className="w-49.5 h-49.5" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 md:left-50 bottom-4 md:-bottom-4 translate-y-1/2 w-40 h-40 bg-white rounded-full z-2 shadow-lg"></div>
          </div>

          <div className="relative max-w-4xl mx-auto flex flex-col">
            <div className="flex pt-20 md:pt-7 md:pb-9 justify-center md:justify-start bg-white p-3 shadow-md max-[400px]:text-base text-lg md:text-2xl text-gray-700">
              <div className="text-center md:text-start md:ml-75">
                <p>{userDetails?.firstname} {userDetails?.lastname}</p>
                <p className="sm:text-base text-sm text-gray-500">
                  {userDetails?.classroom} เลขที่ {userDetails?.no}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between mt-8 mb-7 px-9 gap-4">
              <h2 className="text-3xl font-semibold text-gray-700">
                ประวัติการจอง
              </h2>
              <DateFilter
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                bookings={bookings}
                dateList={dateList}
              />
            </div>

            {/* Status Tabs */}
            <StatusTabs
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              thStatus={thStatus}
              statusList={statusList}
              dateFilter={dateFilter}
              bookings={bookings}
              dateFilterFuction={dateFilterFuction}
            />

            <div className="flex flex-col max-[500px]:flex-col-reverse items-center justify-center">
              {/* Select Page */}
              <PageSelector
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                totalPages={totalPages}
                totalBookings={totalBookings}
              />
              <div className="mt-3 mb-6 max-[500px]:mb-0 px-4 relative w-full">
                <div className="overflow-y-hidden w-full border border-gray-300 custom-scroll p-0 h-[314px] rounded-lg shadow-lg relative bg-white">
                  <table className="w-full text-center">
                    <thead className="bg-gray-200 text-gray-600 text-lg border-b border-gray-300">
                      <tr>
                        <th className="py-3 px-4 whitespace-nowrap font-medium">
                          วัน
                        </th>
                        <th className="py-3 px-4 whitespace-nowrap font-medium">
                          คาบ
                        </th>
                        <th className="py-3 px-4 whitespace-nowrap font-medium max-md:hidden">
                          เวลา
                        </th>
                        <th className="py-3 px-4 whitespace-nowrap font-medium">
                          ห้อง
                        </th>
                        <th className="py-3 px-4 whitespace-nowrap font-medium">
                          การใช้งาน
                        </th>
                        <th className="py-3 px-4 whitespace-nowrap font-medium">
                          สถานะ
                        </th>
                        <th className="py-3 px-4 whitespace-nowrap font-medium sticky z-2 right-0 bg-gray-200">
                          <div className="flex justify-center items-center">
                            <Settings className="w-5 h-5" />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-500 text-base">
                      {bookings
                        .filter((booking) => dateFilterFuction(booking))
                        .filter(
                          (booking) =>
                            statusFilter === "all" ||
                            booking.status === statusFilter
                        )
                        .sort((a, b) => {
                          const dayA = dateList.indexOf(a.date);
                          const dayB = dateList.indexOf(b.date);
                          if (dayA == dayB) return a.period - b.period;
                          return dayA - dayB;
                        })
                        .slice(
                          selectedPage * 5 - 5,
                          Math.min(selectedPage * 5, totalBookings)
                        )
                        .map((booking, index) => (
                          <tr
                            key={booking.id}
                            className="relative even:bg-gray-100 bg-white"
                          >
                            <td className="py-2.5 px-4 whitespace-nowrap">
                              {booking.date}
                            </td>
                            <td className="py-2.5 px-4 whitespace-nowrap">
                              {booking.period}
                            </td>
                            <td className="py-2.5 px-4 whitespace-nowrap max-md:hidden">
                              {timeSlots[booking.period].from} -{" "}
                              {timeSlots[booking.period].to}
                            </td>
                            <td className="py-2.5 px-4 whitespace-nowrap">
                              {booking.room}
                            </td>
                            <td className="py-2.5 px-4 whitespace-nowrap">
                              {booking.usage}
                            </td>
                            <td className="py-2.5 whitespace-nowrap flex items-center justify-center">
                              <p
                                className={`w-25 py-1 rounded-lg
                              ${
                                booking.status === "confirmed" &&
                                "text-green-500 bg-green-300/20"
                              }
                              ${
                                booking.status === "booked" &&
                                "text-yellow-500 bg-yellow-200/20"
                              }
                              ${
                                booking.status === "canceled" &&
                                "text-red-500 bg-red-200/20"
                              }
                              `}
                              >
                                {thStatus[booking.status]}
                              </p>
                            </td>
                            <td
                              className={`py-2 px-4 text-center sticky z-2 right-0 shadow-lg ${
                                index % 2 ? "bg-gray-100" : "bg-white"
                              }`}
                            >
                              <div className="flex items-center justify-center">
                                <OptionButton
                                  booking={booking}
                                  cancelBooking={cancelBooking}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      {totalBookings === 0 && (
                        <tr>
                          <td colSpan="7" className="py-4 text-gray-500">
                            ไม่มีรายการจอง
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ErrorBox
          Svg={Warning}
          alt="warning"
          header="ไม่สามารถใช้งานได้"
          message="กรุณาเข้าสู่ระบบเพื่อเข้าใช้งานฟังก์ชันประวัติ"
          buttonText="เข้าสู่ระบบ"
          handleOnclick={() => router.push("/login")}
          color="red"
        />
      )}
    </div>
  );
}

export default HistoryPage;
