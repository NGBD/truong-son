import type { Metadata } from "next";
import type React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nhẫn Bạc Hộ Tâm - Nhẫn Bạc Hộ Tâm Phong Thủy",
  description: "Quà Tặng Phong Thủy Ý Nghĩa - Thu Hút Vận May Ngay Tại Nhà. Nhẫn Bạc Hộ Tâm cao cấp, bảo hành 12 tháng, giao hàng toàn quốc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
