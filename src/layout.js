import Sidebar from "./components/navigation/Sidebar";
import "./globals.css";
import "react-clock/dist/Clock.css";
import { Work_Sans, Montserrat } from "next/font/google";
import Header from "./components/navigation/Header";
import ContextWrapper from "./components/providers/ContextProvider";
import { ThemeProvider } from "@material-tailwind/react";
import NextThemeProvider from "./provider";

const work_sans = Work_Sans({ weight: "400", subsets: ["latin"] });
const montserat = Montserrat({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "MSS Lite",
  description: "Sanitrack",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <ContextWrapper>
          <body className={montserat.className} suppressHydrationWarning={true}>
            <NextThemeProvider>
              <div className="flex flex-col lg:flex-row h-screen overflow-hidden ">
                <Sidebar />
                <div className="relative flex flex-col flex-1 overflow-y-auto ">
                  <Header />

                  <div className="  w-full  bg-[#f9f9f9]  flex flex-col  lg:flex-row  overflow-auto no-scrollbar ">
                    {children}
                  </div>
                </div>
              </div>
            </NextThemeProvider>
          </body>
        </ContextWrapper>
      </ThemeProvider>
    </html>
  );
}
