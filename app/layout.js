import { Inter } from "next/font/google";
import "./globals.css";
import favicon from "./favicon.ico"
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fundación Carlos Cuevas",
  description: "Próximamente",
  icon: favicon
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="./favicon.ico"></link>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
