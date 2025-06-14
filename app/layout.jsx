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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"/>
      </head>
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
