import type { Metadata } from "next";
import { Amiri, Great_Vibes, Playfair_Display, Cairo } from "next/font/google";
import "./globals.css";

const amiri = Amiri({ weight: ["400", "700"], subsets: ["arabic"], variable: '--font-amiri' });
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], variable: '--font-great-vibes' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });
const cairo = Cairo({ subsets: ["arabic"], variable: '--font-cairo' });

export const metadata: Metadata = {
  title: "دعوة زفاف - محمد وقمر",
  description: "يسعدنا دعوتكم لحضور حفل زفافنا وعقد قراننا - الجمعة، ١٨ سبتمبر ٢٠٢٦",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${amiri.variable} ${greatVibes.variable} ${playfair.variable} ${cairo.variable} bg-[#FAFAF5]`}>
        {children}
      </body>
    </html>
  );
}
