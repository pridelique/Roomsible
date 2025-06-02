import "./globals.css";
import Nav from "@components/Nav";

export const metadata = {
  title: "Roomsible",
  description: "Roomsible is a platform for managing and booking rooms efficiently.",
};

export default function RootLayout({ children }) {
  return (
    <html lang='th'>
      <body
        className={`antialiased vsc-initialized`}
      >
        <main className="relative">
          <Nav />
          <section className="padding-x max-container w-full">
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
