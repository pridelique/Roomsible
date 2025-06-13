import "./globals.css";
import Nav from "@components/Nav";
import { DateTimeProvider } from "../provider/DateTimeProvider";
import { SessionProvider } from "../provider/SessionProvider";

export const metadata = {
  title: "Roomsible",
  description:
    "Roomsible is a platform for managing and booking rooms efficiently.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <DateTimeProvider>
        <SessionProvider>
          <body className="antialiased vsc-initialized min-w-screen min-h-screen flex flex-col">
            <Nav />
            <main className="relative flex-1 w-full h-full">{children}</main>
          </body>
        </SessionProvider>
      </DateTimeProvider>
    </html>
  );
}
