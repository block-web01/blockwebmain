import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "BW | Designed with Intelligence. Executed with Smartness.",
  description:
    "We are a startup technology company delivering high-efficiency, scalable digital solutions with precision engineering and intelligent design.",
};

import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} antialiased bg-[#07030a]`}
      >
        <Providers>
          {/* 🔥 MAIN BACKGROUND WRAPPER */}
          <div className="relative min-h-screen bg-[#07030a]">
            {children}
          </div>
        </Providers>

        <VisualEditsMessenger />
      </body>
    </html>
  );
}