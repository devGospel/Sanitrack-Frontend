import { Work_Sans, Montserrat } from "next/font/google";

const monserrat = Montserrat({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Certifications ",
  description: "Certifications Page",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      <main className="w-full ">
        <div className="w-full ">{children}</div>
      </main>
    </>
  );
}
