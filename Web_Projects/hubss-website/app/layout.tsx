import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HUB Surface Systems | Redefining Canadian Hardscapes",
  description: "Canadian leader in decorative and functional pavement solutions. Stamped asphalt, thermoplastics, and specialty coatings for municipalities and contractors.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`} style={{ background: "#1a1a1a", color: "#f5f0eb" }}>
        {children}
      </body>
    </html>
  );
}
