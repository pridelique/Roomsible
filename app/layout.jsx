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
      <body className={`antialiased vsc-initialized`}>
        <DateTimeProvider>
          <SessionProvider>
            <main className="relative">
              <Nav />
              <section className="padding-x max-container w-full pt-25">
                {children}
              </section>
            </main>
          </SessionProvider>
        </DateTimeProvider>
      </body>
    </html>
  );
}
