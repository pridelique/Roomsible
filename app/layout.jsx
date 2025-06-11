import { DateTimeProvider } from "./DateTimeProvider";
import "./globals.css";
import Nav from "@components/Nav";

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
          <main className="relative">
            <Nav />
            <section className="padding-x max-container w-full pt-25">
              {children}
            </section>
          </main>
        </DateTimeProvider>
      </body>
    </html>
  );
}
