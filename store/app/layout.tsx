import Footer from "@/components/footer";
import "./globals.css";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import Navbar from "@/components/navbar";
import ModalProvider from "@/providers/modalProviders";
import ToastProvider from "@/providers/toastProvider";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WizCart",
  description: "WizCart",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log = console.warn = console.error = () => {};
  return (
    <html lang="en">
      <body className={font.className}>
        <ModalProvider />
        <ToastProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
