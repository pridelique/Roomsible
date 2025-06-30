import "./globals.css";
import Nav from "@components/Nav";
import { DateTimeProvider } from "../provider/DateTimeProvider";
import { SessionProvider } from "../provider/SessionProvider";
import { ToastContainer } from "@node_modules/react-toastify";
export const metadata = {
  title: "Roomsible",
  description:
    "Roomsible is a platform for managing and booking rooms efficiently.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Mali:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <DateTimeProvider>
        <SessionProvider>
          <body className="antialiased vsc-initialized min-w-screen min-h-screen flex flex-col">
            <Nav />
            <main className="relative flex-1 w-full h-full">
              {children}
              <ToastContainer stacked={true} />
            </main>
          </body>
        </SessionProvider>
      </DateTimeProvider>
    </html>
  );
}
