import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trending Topics",
  description: "List of world's trending topics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer autoClose={3000} />
        <Header />
        {children}
      </body>
    </html>
  );
}
