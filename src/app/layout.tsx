import type { Metadata } from "next";
import { Outfit, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Cho Em ❤️",
  description: "Một món quà bất ngờ dành cho người đặc biệt nhất.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${outfit.variable} ${inter.variable} ${playfair.variable} antialiased bg-love-gradient min-h-screen text-gray-800 font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
