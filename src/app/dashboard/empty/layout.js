import { Work_Sans, Montserrat,Abril_Fatface } from "next/font/google";

const monserrat = Abril_Fatface({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Sanitrack Overview ",
  description: "Sanitrack Overview Home Page",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <div className={`${monserrat.className} w-full`}>
      <main className="w-full ">
        <div className="w-full ">{children}</div>
      </main>
    </div>
  );
}
