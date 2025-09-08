import type { Metadata } from "next";
import type React from "react";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Nhẫn Bạc Hộ Tâm - Nhẫn Bạc Hộ Tâm Phong Thủy",
  description: "Quà Tặng Phong Thủy Ý Nghĩa - Thu Hút Vận May Ngay Tại Nhà. Nhẫn Bạc Hộ Tâm cao cấp, bảo hành 12 tháng, giao hàng toàn quốc.",
  openGraph: {
    title: "Nhẫn Bạc Hộ Tâm - Nhẫn Bạc Hộ Tâm Phong Thủy",
    description: "Quà Tặng Phong Thủy Ý Nghĩa - Thu Hút Vận May Ngay Tại Nhà. Nhẫn Bạc Hộ Tâm cao cấp, bảo hành 12 tháng, giao hàng toàn quốc.",
    images: [
      {
        url: "/images/slide1.jpg",
        width: 1200,
        height: 630,
        alt: "Nhẫn Bạc Hộ Tâm"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Nhẫn Bạc Hộ Tâm - Nhẫn Bạc Hộ Tâm Phong Thủy",
    description: "Quà Tặng Phong Thủy Ý Nghĩa - Thu Hút Vận May Ngay Tại Nhà. Nhẫn Bạc Hộ Tâm cao cấp, bảo hành 12 tháng, giao hàng toàn quốc.",
    images: ["/images/slide1.jpg"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${montserrat.variable} antialiased`} style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
        <Script id="fb-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
        `}</Script>
        <Script id="fb-pixel-init" strategy="afterInteractive">{`
          fbq('init', '1435534627737093');
          fbq('consent', 'grant');
          fbq('track', 'PageView');
        `}</Script>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <noscript>
          <img height="1" width="1" style={{display:'none'}} src="https://www.facebook.com/tr?id=1435534627737093&ev=PageView&noscript=1" alt="" />
        </noscript>
        {children}
      </body>
    </html>
  );
}
