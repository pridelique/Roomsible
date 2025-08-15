"use client";
import ErrorBox from "@components/ErrorBox";
import DayFilter from "@components/history_components/DayFilter";
import OptionButton from "@components/history_components/OptionButton";
import PageSelector from "@components/history_components/PageSelector";
import StatusTabs from "@components/history_components/StatusTabs";
import Loading from "@components/Loading";
import { timeSlots } from "@data";
import { bookingDemo } from "@data/bookingDemo";
import { format } from "@node_modules/date-fns/format";
import { Settings } from "@node_modules/lucide-react";
import { useRouter } from "@node_modules/next/navigation";
import { SessionContext } from "@provider/SessionProvider";
import { date, Warning } from "@public/assets/icons";
import { Guest_Profile } from "@public/assets/images";
import { supabase } from "@utils/supabase";
import { dayEnToThai } from "@utils/translateDay";
import { useState, useEffect, useRef, useContext } from "react";
import { toZonedTime } from "date-fns-tz";

const thStatus = {
  all: "ทั้งหมด",
  pending: "จองแล้ว",
  confirmed: "ยืนยันแล้ว",
  // cancelled: "ยกเลิก",
};

const dayList = ["monday", "tuesday", "wednesday", "thursday", "friday"];
const statusList = [
  "all",
  "confirmed",
  "pending",
  // "cancelled"
];

function HistoryPage() {
  const [allBookings, setAllBookings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [bookingQuota, setBookingQuota] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  // const [dayFilter, setdayFilter] = useState("all");
  const [totalPages, setTotalPages] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPage, setSelectedPage] = useState(totalBookings == 0 ? 0 : 1);
  const { user } = useContext(SessionContext);
  const [userDetails, setUserDetails] = useState(null);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const fetched = useRef(false);
  const router = useRouter();

  const cancelBooking = async (booking_id) => {
    try {
      const res = await fetch("/api/bookings", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ booking_id }),
      });
      const data = await res.json();
      // console.log(data);

      if (res.ok) {
        // console.log("Booking cancelled successfully");

        setBookings((prev) =>
          prev.filter((booking) => booking.booking_id !== booking_id)
        );
        setAllBookings((prev) =>
          prev.filter((booking) => booking.booking_id !== booking_id)
        );
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  // const dayFilterFuction = (booking) => {
  //   let todayIndex = new Date().getDay() - 1;
  //   if (todayIndex > 4) todayIndex = 0;
  //   if (dayFilter === "all") return true;
  //   else if (dayFilter === "today")
  //     return dayList.indexOf(booking.day) === todayIndex;
  //   else if (dayFilter === "fromToday")
  //     return dayList.indexOf(booking.day) >= todayIndex;
  //   return booking.day === selectedDate;
  // };

  useEffect(() => {
    const totalBookings = bookings
      // .filter((booking) => dayFilterFuction(booking))
      .filter(
        (booking) => statusFilter === "all" || booking.status === statusFilter
      ).length;
    if (totalBookings === 0) setSelectedPage(0);
    else setSelectedPage(1);
    setTotalBookings(totalBookings);
    setTotalPages(Math.ceil(totalBookings / 5));
    // if (dayFilter !== "options") setSelectedDate("");
    // console.log("Bookings updated:", dayFilter);
  }, [statusFilter, selectedDate, bookings]);

  useEffect(() => {
    if (!user) return;
    const role = user?.app_metadata?.role;
    if (role === "student" || role === "leader") {
      setBookingQuota(
        Math.max(
          0,
          1 - bookings.filter((item) => item.type === "activity").length
        )
      );
    } else {
      setBookingQuota(
        Math.max(
          0,
          999 - bookings.filter((item) => item.type === "activity").length
        )
      );
    }
  }, [allBookings]);

  useEffect(() => {
    if (!user?.id) return;
    if (fetched.current) return;
    fetched.current = true;
    const getUserDetails = async () => {
      if (!user) return;
      // console.log(user);

      const { data, error } = await supabase
        .from("users")
        .select("firstname, lastname, classroom, no, banned_until")
        .eq("user_id", user?.id)
        .single();
      if (error) {
        console.log("Error fetching user details:", error);
        return;
      }
      setUserDetails(data);

      const now = toZonedTime(new Date(), "Asia/Bangkok");

      // reset banned_until if it is in the past
      if (data.banned_until && new Date(data.banned_until) < now) {
        const { error: updateError } = await supabase
          .from("users")
          .update({ banned_until: null })
          .eq("user_id", user.id);
        if (updateError) {
          console.log("Error updating banned_until:", updateError);
        }
        setUserDetails((prev) => ({ ...prev, banned_until: null }));
      }
    };

    const getBookings = async () => {
      if (!user) return;
      setBookingsLoading(true);
      const { data: bookings, error } = await supabase
        .from("bookings")
        .select(
          "booking_id, day, period, room, type, status, teacher, subject, student_class, detail"
        )
        .eq("user_id", user?.id);
      if (error && error.code !== "PGRST116") {
        console.log("Error fetching bookings:", error);
      } else {
        console.log(bookings);
        setBookings(bookings.filter((item) => item.status != "cancelled"));
        setAllBookings(bookings);
      }
      setBookingsLoading(false);
    };
    getUserDetails();
    getBookings();
  }, [user]);

  // if (user === "loading") return <Loading />;

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
            <div className="flex pt-20 md:pt-7 justify-center md:justify-start bg-white p-3 shadow-md max-[400px]:text-base text-lg md:text-2xl md:h-30 text-gray-700">
              <div className="text-center md:text-start md:ml-75 leading-10">
                {userDetails ? (
                  <>
                    <p>
                      {userDetails?.firstname} {userDetails?.lastname}
                    </p>
                    <div className="sm:text-base text-sm text-gray-500">
                      {userDetails?.classroom} เลขที่ {userDetails?.no}
                      {userDetails?.banned_until ? (
                        <span className="ml-10 text-[13px] text-red-500">
                          คุณถูกระงับสิทธิ์จนถึงวันที่{" "}
                          {format(userDetails?.banned_until, "dd/MM/yyyy")}
                        </span>
                      ) : (
                        <>
                          {bookingsLoading ? (
                            <span className="sm:h-4 h-[14px] w-20 mt-3 rounded-full bg-gray-300 animate-pulse"></span>
                          ) : (
                            <>
                              {bookingQuota > 0 ? (
                                <span className="ml-10 text-[13px] text-green-500">
                                  สิทธิ์คงเหลือ {bookingQuota} ห้อง
                                </span>
                              ) : (
                                <span className="ml-10 text-[13px] text-red-500">
                                  หมดสิทธิ์การจองห้อง
                                </span>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col max-md:items-center">
                    <div className="w-50 max-[400px]:h-4 h-[18px] md:h-6 mt-2 rounded-full bg-gray-300 animate-pulse"></div>
                    <div className="sm:h-4 h-[14px] w-70 mt-3 rounded-full bg-gray-300 animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between mt-8 mb-7 px-9 gap-4">
              <h2 className="text-3xl font-semibold text-gray-700">
                ประวัติการจอง
              </h2>
              {/* <DayFilter
                dayFilter={dayFilter}
                setdayFilter={setdayFilter}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                bookings={bookings}
                dayList={dayList}
              /> */}
            </div>

            {/* Status Tabs */}
            <StatusTabs
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              thStatus={thStatus}
              statusList={statusList}
              // dayFilter={dayFilter}
              bookings={bookings}
              bookingsLoading={bookingsLoading}
              // dayFilterFuction={dayFilterFuction}
            />

            <div className="flex flex-col max-[500px]:flex-col-reverse items-center justify-center">
              {/* Select Page */}
              <PageSelector
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                totalPages={totalPages}
                totalBookings={totalBookings}
                bookingsLoading={bookingsLoading}
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
                            {/* <Settings className="w-5 h-5" /> */}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-500 text-base">
                      {bookingsLoading ? (
                        <>
                          {[...Array(5)].map((_, index) => (
                            <tr
                              key={index}
                              className="relative even:bg-gray-100 bg-white"
                            >
                              <td className="py-4 px-6 whitespace-nowrap">
                                <div className="rounded-full bg-gray-300 animate-pulse h-5"></div>
                              </td>
                              <td className="py-4 px-6 whitespace-nowrap">
                                <div className="rounded-full bg-gray-300 animate-pulse h-5"></div>
                              </td>
                              <td className="py-4 px-6 whitespace-nowrap max-md:hidden">
                                <div className="rounded-full bg-gray-300 animate-pulse h-5"></div>
                              </td>
                              <td className="py-4 px-6 whitespace-nowrap">
                                <div className="rounded-full bg-gray-300 animate-pulse h-5"></div>
                              </td>
                              <td className="py-4 px-6 whitespace-nowrap">
                                <div className="rounded-full bg-gray-300 animate-pulse h-5"></div>
                              </td>
                              <td className="py-4 px-6 whitespace-nowrap">
                                <div className="rounded-full bg-gray-300 animate-pulse h-5"></div>
                              </td>
                              <td className="py-4 px-6 whitespace-nowrap">
                                <div className="rounded-full bg-gray-300 animate-pulse h-5"></div>
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <>
                          {bookings
                            // .filter((booking) => dayFilterFuction(booking))
                            .filter(
                              (booking) =>
                                statusFilter === "all" ||
                                booking.status === statusFilter
                            )
                            .sort((a, b) => {
                              const dayA = dayList.indexOf(a.day);
                              const dayB = dayList.indexOf(b.day);
                              if (dayA == dayB) return a.period - b.period;
                              return dayA - dayB;
                            })
                            .slice(
                              selectedPage * 5 - 5,
                              Math.min(selectedPage * 5, totalBookings)
                            )
                            .map((booking, index) => (
                              <tr
                                key={booking.booking_id}
                                className="relative even:bg-gray-100 bg-white"
                              >
                                <td className="py-2.5 px-4 whitespace-nowrap">
                                  {dayEnToThai[booking.day].slice(3)}
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
                                  {booking.type === "activity"
                                    ? "กิจกรรม"
                                    : "เรียน"}
                                </td>
                                <td className="py-2.5 whitespace-nowrap flex items-center justify-center">
                                  <p
                                    className={`w-25 py-1 rounded-lg
                              ${
                                booking.status === "confirmed" &&
                                "text-green-500 bg-green-300/20"
                              }
                              ${
                                booking.status === "pending" &&
                                "text-yellow-500 bg-yellow-200/20"
                              }
                              ${
                                booking.status === "cancelled" &&
                                "text-red-500 bg-red-200/20"
                              }
                              `}
                                  >
                                    {thStatus[booking.status]}
                                  </p>
                                </td>
                                <td
                                  className={`py-2 px-4 text-center sticky z-2 right-0 ${
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
                        </>
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
