import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fundación Carlos Cuevas",
  description: "Próximamente",
  icon: '../app/favicon.ico'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico"></link>
      <link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png"></link>
      <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png"></link>
      <link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png"></link>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
