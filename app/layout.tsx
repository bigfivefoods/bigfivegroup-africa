import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Big Five Group Africa",
  description: "Building Africa’s future with integrity, transparency, and measurable impact.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} [--navbar-height:5rem]`}>
        <Navbar />
        
        <main className="pt-[var(--navbar-height)]">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}